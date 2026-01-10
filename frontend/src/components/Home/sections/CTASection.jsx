import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function CTASection() {
  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-r from-red-600/20 via-red-500/10 to-red-600/20 border-y border-red-500/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Take Control of Your Respiratory Health
          </motion.h2>

          <motion.p
            className="text-lg lg:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of users who trust RespireNet for early respiratory disease detection.
          </motion.p>

          <motion.p
            className="text-gray-400 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Upload your audio in seconds. Get AI-powered insights immediately. Start your journey to better health today.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/predict">
              <motion.button
                className="px-10 py-4 bg-red-500 text-white text-xl font-bold rounded-lg hover:bg-red-600 shadow-lg transition-all"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Prediction
              </motion.button>
            </Link>

            <Link to="/about">
              <motion.button
                className="px-10 py-4 border-2 border-red-500 text-red-500 text-xl font-bold rounded-lg hover:bg-red-500/10 shadow-lg transition-all"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-12 pt-8 border-t border-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm">
              ✓ 100% Free • ✓ No Registration Required • ✓ Results in Under 2 Seconds
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
