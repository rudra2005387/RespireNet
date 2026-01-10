import { motion } from 'framer-motion';

const stats = [
  { label: 'Accuracy Rate', value: '92%', icon: '🎯' },
  { label: 'Diseases Detected', value: '8', icon: '🏥' },
  { label: 'Processing Speed', value: '<2s', icon: '⚡' },
  { label: 'Privacy Score', value: '100%', icon: '🔒' },
];

function StatisticsBar() {
  return (
    <section className="py-12 px-4 lg:px-8 bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10 border-y border-red-500/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-4xl md:text-5xl mb-3"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-300 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatisticsBar;
