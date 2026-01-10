import { motion } from 'framer-motion';

const conditions = [
  { name: 'Asthma', emoji: '💨', description: 'Chronic inflammation of airways' },
  { name: 'Bronchitis', emoji: '🔴', description: 'Inflammation of bronchial tubes' },
  { name: 'Pneumonia', emoji: '🫁', description: 'Lung tissue infection' },
  { name: 'COPD', emoji: '⚠️', description: 'Chronic Obstructive Pulmonary Disease' },
  { name: 'URTI', emoji: '🤒', description: 'Upper Respiratory Tract Infection' },
  { name: 'Bronchiectasis', emoji: '🌳', description: 'Abnormal bronchi dilation' },
  { name: 'Bronchiolitis', emoji: '👶', description: 'Inflammation of bronchioles' },
  { name: 'Healthy', emoji: '✅', description: 'Normal respiratory function' },
];

function SupportedConditionsGrid() {
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Supported Conditions</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            RespireNet can detect and classify 8 different respiratory conditions with high accuracy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {conditions.map((condition, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 hover:border-red-500 p-6 rounded-lg text-center cursor-pointer transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <motion.div
                className="text-5xl mb-4 group-hover:scale-110 transition-transform"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
              >
                {condition.emoji}
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{condition.name}</h3>
              <p className="text-gray-400 text-sm">{condition.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SupportedConditionsGrid;
