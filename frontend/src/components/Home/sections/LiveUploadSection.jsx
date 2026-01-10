import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function LiveUploadSection() {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  return (
    <section className="py-20 px-4 lg:px-8 bg-black/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border-2 border-red-500/50 rounded-2xl p-12 lg:p-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Try It Now
          </motion.h2>

          <motion.p
            className="text-gray-300 text-lg mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience the power of AI-driven respiratory analysis instantly. Upload your cough audio and get immediate insights.
          </motion.p>

          {/* Upload Area Preview */}
          <motion.div
            className={`border-2 border-dashed rounded-xl p-12 mb-8 transition-all ${
              isDragActive ? 'border-red-500 bg-red-500/10' : 'border-gray-600 bg-gray-900/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            whileHover={{ borderColor: '#ef4444' }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🎙️
            </motion.div>
            <p className="text-gray-300 text-lg">Drag & drop your audio file or click to browse</p>
            <p className="text-gray-500 text-sm mt-2">Supports WAV, MP3, and other audio formats</p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link to="/predict">
              <motion.button
                className="px-8 py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all shadow-lg text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upload Audio
              </motion.button>
            </Link>

            <Link to="/predict">
              <motion.button
                className="px-8 py-4 border-2 border-red-500 text-red-500 font-bold rounded-lg hover:bg-red-500/10 transition-all shadow-lg text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Record Audio
              </motion.button>
            </Link>
          </motion.div>

          <p className="text-gray-500 text-sm mt-6">✓ Fast processing • ✓ Instant results • ✓ 100% private</p>
        </motion.div>
      </div>
    </section>
  );
}

export default LiveUploadSection;
