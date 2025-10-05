import { motion } from "framer-motion";
import img from "../../public/Images/Crypto/09.png";

const Crypto = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <section className="crypto_section relative w-full overflow-hidden py-20 lg:py-30">
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-200/30 rounded-full filter blur-3xl"></div>

      <div className="relative common_padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-25 items-center">
          <motion.div
            className="img_container relative order-2 lg:order-1 px-4 lg:p-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
              <motion.div
                className="relative bg-gray-800 rounded-2xl p-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={img}
                  className="w-full h-auto rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                  alt="Cryptocurrency trading platform interface showing charts and trading features"
                />
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="content_container space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl text-white sm:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              Built a Platform to Buy and Sell Shares
            </motion.h2>
            <div className="flex flex-col lg:flex-row gap-5">
              <motion.div
                className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:shadow-lg transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={cardVariants}
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Easy 3-Step Process
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Here are 3 easy steps to buy & sell Bitcoin. Our platform has
                  been the industry's leading solution since 2020, providing
                  secure and intuitive cryptocurrency trading for millions of
                  users worldwide.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:shadow-lg transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={cardVariants}
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Secure & Reliable
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Built with enterprise-grade security and 24/7 monitoring, our
                  platform ensures your investments are safe. Join thousands of
                  satisfied traders who trust CoinEX for their cryptocurrency
                  needs.
                </p>
              </motion.div>
            </div>

            <motion.div className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.button
                className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileInView={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <span className="relative z-10">Buy Token</span>
                <svg
                  className="ml-1 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </motion.button>
              <motion.div
                className="group relative inline-flex p-[2px] bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                whileHover={{ scale: 1.03 }}
              >
                <button className="inline-flex items-center justify-center w-full h-full px-6 py-3 bg-gray-900 rounded-full transition-colors duration-300 group-hover:bg-gray-800">
                  <span className="font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    View Demo
                  </span>
                  <svg
                    className="ml-2 w-5 h-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Crypto;
