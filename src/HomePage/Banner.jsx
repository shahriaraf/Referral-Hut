import { motion } from "framer-motion";
import banner_img from "../../public/Images/Banner/banner.png";

const Banner = () => {
  return (
    <section className="banner_section w-full min-h-screen">
      <div className="relative common_padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[90vh] py-10">
          <motion.div
            className="banner_cnt space-y-8 lg:pr-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="primary_text_color text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Token Creative
              </span>
              <br />
              <span className="text-white text-4xl sm:text-5xl">
                of CoinEX Theme
              </span>
            </motion.h1>
            <motion.p
              className="text-white text-sm sm:text-lg leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Experience the future of cryptocurrency trading with our
              innovative, user-friendly platform designed for both beginners and
              professionals.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <button className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                <span className="relative z-10">Buy Token</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
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
              </button>

              <div className="group relative inline-flex p-[2px] bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
                <button className="inline-flex items-center justify-center w-full h-full px-6 py-3 bg-gray-900 rounded-full transition-colors duration-300 group-hover:bg-gray-800">
                  <span className="font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    Learn More
                  </span>
                  <svg
                    className="ml-2 w-4 h-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-8 pt-8 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-white">Active Users</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-purple-600">99.9%</div>
                <div className="text-sm text-white">Uptime</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-white">Support</div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="banner_img relative order-first lg:order-last p-4 lg:p-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl transform -rotate-6 scale-105 opacity-20"></div>
              <div className="relative bg-gray-800 rounded-3xl p-4 shadow-2xl">
                <img
                  src={banner_img}
                  className="w-full h-auto rounded-2xl"
                  alt="CoinEX Theme Banner - Modern cryptocurrency trading interface"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
