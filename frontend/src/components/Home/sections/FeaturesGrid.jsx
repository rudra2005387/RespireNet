import { motion } from 'framer-motion';

const features = [
  {
    icon: '🎤',
    title: 'Easy Audio Upload',
    description: 'Upload or record your cough sound in seconds with our intuitive interface.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Analysis',
    description: 'Advanced deep learning models trained on extensive respiratory sound datasets.',
  },
  {
    icon: '⚡',
    title: 'Instant Results',
    description: 'Get rapid predictions with comprehensive confidence scores and visualizations.',
  },
  {
    icon: '📊',
    title: 'Visual Insights',
    description: 'View detailed spectrograms and confidence charts for each prediction.',
  },
  {
    icon: '🔒',
    title: 'Privacy Protected',
    description: 'Your audio data is never stored or shared with third parties.',
  },
  {
    icon: '✓',
    title: 'Evidence-Based',
    description: 'Built on clinical research and machine learning best practices.',
  },
];

function FeaturesGrid() {
  return (
    <section className="py-20 px-4 lg:px-8 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Why Choose RespireNet?</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Experience the future of respiratory health monitoring with cutting-edge technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 hover:border-red-500 p-8 rounded-xl backdrop-blur-sm transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesGrid;
