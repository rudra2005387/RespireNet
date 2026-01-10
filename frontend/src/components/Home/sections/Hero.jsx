import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Hero({ onLearnMore }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black px-4 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-6"
        >
          <motion.h1
            className="text-5xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Respiratory Health at Your <span className="text-red-500">Fingertips</span>
          </motion.h1>

          <motion.p
            className="text-lg lg:text-xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Upload or record your cough sound and let our AI-powered analysis detect potential respiratory diseases
            with high accuracy. Early detection, informed decisions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link to="/predict">
              <motion.button
                className="px-8 py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all shadow-lg text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>

            <motion.button
              onClick={onLearnMore}
              className="px-8 py-4 border-2 border-red-500 text-red-500 font-bold rounded-lg hover:bg-red-500/10 transition-all shadow-lg text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Side - Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full h-96 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-2xl border border-red-500/30 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl"
            >
              🫁
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
