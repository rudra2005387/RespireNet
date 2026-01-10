import { motion } from "framer-motion";

export default function AudioUpload({ audioFile, setAudioFile }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    } else {
      alert("Please upload a valid audio file.");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-10 rounded-xl shadow-lg backdrop-blur-x h-[465px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-red-500 animate-pulse">
        Upload Cough Audio (.wav format)
      </h2>

      <motion.div
        className="w-96 h-40 border-2 border-dashed border-red-400 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-red-500 hover:text-red-500 transition-all cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        whileHover={{ scale: 1.05 }}
      >
        {audioFile ? (
          <p className="text-white font-semibold">{audioFile.name}</p>
        ) : (
          <>
            <motion.p
              className="text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Drag & Drop an audio file here
            </motion.p>
            <p className="text-sm text-gray-500 mt-2">or click below to upload</p>
          </>
        )}
      </motion.div>

      <input
        type="file"
        accept="audio/*"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
      />

      <motion.label
        htmlFor="fileInput"
        className="mt-6 px-6 py-3 border-2 border-red-500 text-white font-bold rounded-lg cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Select File
      </motion.label>

      {audioFile && (
        <motion.audio
          controls
          className="mt-6 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
          Your browser does not support the audio element.
        </motion.audio>
      )}
    </motion.div>
  );
}
