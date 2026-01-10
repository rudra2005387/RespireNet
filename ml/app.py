"""
Flask Web Application for Brain Tumor Classification
Upload an MRI image and get instant predictions
"""
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import os
import numpy as np
import tensorflow as tf
from pathlib import Path
import json
from PIL import Image

app = Flask(__name__)

# Configuration
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp'}

# Model configuration
MODEL_PATH = 'hybrid_cnn_resnet50_best.h5'
CLASS_NAMES = ['glioma', 'meningioma', 'notumor', 'pituitary']
IMG_SIZE = (128, 128)

# Global model variable
model = None


def load_model():
    """Load the trained model"""
    global model
    try:
        print("Loading model...")
        model = tf.keras.models.load_model(MODEL_PATH)
        print("Model loaded successfully!")
        return True
    except Exception as e:
        print(f"Error loading model: {e}")
        return False


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def preprocess_image(img_path):
    """Preprocess image for prediction"""
    try:
        img = Image.open(img_path).convert('RGB')
        img = img.resize(IMG_SIZE)
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = tf.keras.applications.resnet50.preprocess_input(img_array)
        return img_array
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        return None


def predict_image(img_path):
    """Make prediction on an image"""
    global model
    
    if model is None:
        return None
    
    # Preprocess
    processed_img = preprocess_image(img_path)
    if processed_img is None:
        return None
    
    # Predict
    predictions = model.predict(processed_img, verbose=0)
    
    # Get results
    predicted_class_idx = np.argmax(predictions[0])
    predicted_class = CLASS_NAMES[predicted_class_idx]
    confidence = float(predictions[0][predicted_class_idx] * 100)
    
    # All probabilities
    all_probs = {
        class_name: float(prob * 100)
        for class_name, prob in zip(CLASS_NAMES, predictions[0])
    }
    
    return {
        'predicted_class': predicted_class,
        'confidence': confidence,
        'probabilities': all_probs
    }


@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    """Handle image upload and prediction"""
    try:
        # Check if file was uploaded
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Check if file is allowed
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Allowed: PNG, JPG, JPEG, BMP'}), 400
        
        # Save file
        filename = secure_filename(file.filename)
        
        # Create uploads folder if it doesn't exist
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Make prediction
        result = predict_image(filepath)
        
        if result is None:
            return jsonify({'error': 'Error processing image'}), 500
        
        # Add image URL to result
        result['image_url'] = url_for('static', filename=f'../uploads/{filename}')
        
        return jsonify(result)
    
    except Exception as e:
        print(f"Error in prediction: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })


if __name__ == '__main__':
    # Create necessary folders
    os.makedirs('uploads', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    # Load model
    if load_model():
        print("\nStarting Flask server...")
        print("Access the app at: http://localhost:5000")
        app.run(debug=False, host='0.0.0.0', port=5000, use_reloader=False)
    else:
        print("Failed to load model. Exiting...")
