import { motion } from 'framer-motion';

const timelineSteps = [
  {
    number: 1,
    title: 'Upload Audio',
    description: 'Record or upload your cough audio file',
    icon: '🎤',
  },
  {
    number: 2,
    title: 'Feature Extraction',
    description: 'AI extracts MFCC and Mel spectrograms',
    icon: '🔧',
  },
  {
    number: 3,
    title: 'Model Inference',
    description: 'Deep learning model analyzes patterns',
    icon: '🧠',
  },
  {
    number: 4,
    title: 'Get Results',
    description: 'Receive predictions with confidence scores',
    icon: '📈',
  },
];

function HowItWorks() {
  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-black/50 to-black/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A seamless journey from audio upload to actionable health insights.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-gray-800 via-red-500 to-gray-800"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Connector dot */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-3xl border-4 border-black relative z-10"
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  className="bg-gray-900/50 border border-gray-800 hover:border-red-500 p-6 rounded-lg text-center transition-all"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-red-500 font-bold text-sm mb-2">Step {step.number}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
