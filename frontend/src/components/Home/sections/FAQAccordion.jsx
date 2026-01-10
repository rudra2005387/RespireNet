import { motion } from 'framer-motion';
import { useState } from 'react';

const faqItems = [
  {
    question: 'How accurate is RespireNet?',
    answer:
      'RespireNet achieves an average accuracy of 92% across all respiratory conditions. The accuracy varies by condition, with common diseases like asthma and pneumonia detected with 95%+ accuracy. The system is trained on diverse datasets to ensure reliability.',
  },
  {
    question: 'Is my audio data safe and private?',
    answer:
      'Yes, your privacy is our top priority. Audio files are processed immediately and never stored on our servers. We do not share any data with third parties. The entire analysis happens locally on your device whenever possible.',
  },
  {
    question: 'Can RespireNet replace a doctor?',
    answer:
      'No, RespireNet is an informational tool only. It should not replace professional medical advice. Always consult a healthcare professional for accurate diagnosis and treatment. RespireNet is designed to help you understand potential issues and encourage early consultation.',
  },
  {
    question: 'What audio formats are supported?',
    answer:
      'RespireNet supports common audio formats including WAV, MP3, FLAC, and AAC. For best results, use clear recordings of 3-5 seconds of coughing. Background noise may affect accuracy, so quieter environments are preferred.',
  },
  {
    question: 'How long does analysis take?',
    answer:
      'Most predictions are generated in less than 2 seconds. The speed depends on your device specifications and audio length. Longer audio files (>10 seconds) may take slightly longer to process.',
  },
  {
    question: 'Does RespireNet work offline?',
    answer:
      'The core prediction model can work offline on your device. However, for optimal performance and the latest updates, we recommend an internet connection. All processing is still private and local.',
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-black/50 to-black/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-300 text-lg">Get answers to common questions about RespireNet.</p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="border border-gray-800 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 bg-gray-900/50 hover:bg-gray-900/70 flex items-center justify-between transition-all"
                whileHover={{ backgroundColor: 'rgba(17, 24, 39, 0.9)' }}
              >
                <h3 className="text-lg font-semibold text-white text-left">{item.question}</h3>
                <motion.div
                  className="text-red-500 text-2xl flex-shrink-0 ml-4"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.div>
              </motion.button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-black/50 border-t border-gray-800">
                  <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 p-6 bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/30 rounded-lg text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300">
            Can&apos;t find your answer? <span className="text-red-500 font-semibold cursor-pointer hover:underline">Contact us</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQAccordion;
