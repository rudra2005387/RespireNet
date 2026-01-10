import { motion } from 'framer-motion';

function SampleResultsPreview() {
  const sampleResult = {
    top_disease: 'Healthy',
    confidence: 87.5,
    top_5: [
      { disease: 'Healthy', confidence: 87.5 },
      { disease: 'URTI', confidence: 8.2 },
      { disease: 'Asthma', confidence: 3.1 },
      { disease: 'Bronchitis', confidence: 1.0 },
      { disease: 'Pneumonia', confidence: 0.2 },
    ],
  };

  return (
    <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-black/30 to-black/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Sample Results</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            See how RespireNet provides detailed health insights in seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left - Result Summary */}
          <motion.div
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <div className="text-6xl text-green-400 mb-4">✓</div>
              <h3 className="text-2xl font-bold text-white mb-2">Top Prediction</h3>
              <p className="text-gray-400">Based on AI analysis of respiratory audio patterns</p>
            </div>

            <div className="bg-black/50 rounded-lg p-6 mb-8 border border-gray-700">
              <div className="text-4xl font-bold text-green-400 mb-2">{sampleResult.top_disease}</div>
              <div className="text-xl text-gray-300">
                Confidence: <span className="text-green-400 font-bold">{sampleResult.confidence}%</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Top 5 Predictions</h4>
              <div className="space-y-3">
                {sampleResult.top_5.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-gray-300">{item.disease}</span>
                    <div className="flex items-center gap-3 flex-1 ml-4">
                      <div className="flex-1 bg-gray-800 rounded-full h-2">
                        <motion.div
                          className={`h-full rounded-full ${
                            item.confidence > 50
                              ? 'bg-green-500'
                              : item.confidence > 20
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.confidence}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        ></motion.div>
                      </div>
                      <span className="text-sm font-bold text-gray-400 w-12 text-right">{item.confidence}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Visualizations */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Mel Spectrogram Placeholder */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Mel Spectrogram</h4>
              <div className="bg-black/50 rounded-lg aspect-video flex items-center justify-center border border-gray-700">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-gray-500">Audio frequency analysis</p>
                </div>
              </div>
            </div>

            {/* Confidence Chart Placeholder */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Confidence Levels</h4>
              <div className="bg-black/50 rounded-lg aspect-video flex items-center justify-center border border-gray-700">
                <div className="text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <p className="text-gray-500">Disease probability distribution</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SampleResultsPreview;
