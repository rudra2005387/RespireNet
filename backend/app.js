const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight requests properly
app.options("*", cors());
app.use(express.json()); // Middleware to parse JSON requests

// Serve static files from the 'outputs' directory
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));

// Configure Multer for file uploads
const upload = multer({
    dest: 'uploads/', // Save uploaded files here
    limits: { fileSize: 100 * 1024 * 1024 }, // Max file size: 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['audio/wav', 'audio/mpeg', 'audio/x-wav'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only WAV/MP3 files are allowed."));
        }
    }
});

// API endpoint for disease prediction
app.post('/predict-disease', upload.single('cough_audio'), (req, res) => {
    try {
        console.log("Works")
        if (!req.file) {
            return res.status(400).json({ error: "No audio file uploaded" });
        }

        const audioFilePath = path.resolve(req.file.path);
        console.log("Received audio file:", audioFilePath);

        // Set response headers
        res.set('Cache-Control', 'no-store');
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

        // Spawn Python process
        const pythonProcess = spawn('python', ['predict_disease.py', audioFilePath], {
            env: { ...process.env, TF_CPP_MIN_LOG_LEVEL: "2" }  // Suppress TF info logs
        });

        let pythonOutput = '';
        pythonProcess.stdout.on('data', (data) => {
            pythonOutput += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            // Delete the uploaded file after processing
            fs.unlink(audioFilePath, (err) => {
                if (err) console.error("Error deleting file:", err);
            });

            if (code !== 0) {
                console.error(`Python process exited with code ${code}`);
                return res.status(500).json({ error: "Error in disease prediction" });
            }

            const lines = pythonOutput.trim().split(/\r?\n/);
            const lastLine = lines[lines.length - 1];
            try {
                // Now this will be a proper object instead of containing a string
                res.json(JSON.parse(lastLine));
            } catch (error) {
                console.error("Error parsing Python output:", error);
                res.status(500).json({ error: "Invalid response from prediction model" });
            }
        });

        pythonProcess.on('error', (error) => {
            console.error(`Error starting Python process: ${error.message}`);
            res.status(500).json({ error: "Failed to run prediction script" });
        });

    } catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
