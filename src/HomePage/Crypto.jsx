import React from "react";
import img from "../../public/Images/Crypto/09.png";

const Crypto = () => {
  return (
    <section className="crypto_section relative w-full overflow-hidden py-20 lg:py-32">
      {/* Background Elements */}
   
  
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-200/30 rounded-full filter blur-3xl"></div>

      <div className="relative common_padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-25 items-center">
          
          {/* Image Section */}
          <div className="img_container relative order-2 lg:order-1">
            <div className="relative group">
              {/* Decorative background shapes */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
              
              {/* Main image container */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <img 
                  src={img} 
                  className="w-full h-auto rounded-xl transform group-hover:scale-105 transition-transform duration-500" 
                  alt="Cryptocurrency trading platform interface showing charts and trading features"
                />
              
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="content_container space-y-8 order-1 lg:order-2">
            
          

            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-4xl font-bold leading-tight">

                 Built a Platform to Buy and Sell Shares
             
            
            </h2>

            {/* Content Cards */}
            <div className="flex gap-5">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Easy 3-Step Process
                </h3>
                <p className="text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                  Here are 3 easy steps to buy & sell Bitcoin. Our platform has been the industry's 
                  leading solution since 2020, providing secure and intuitive cryptocurrency trading 
                  for millions of users worldwide.
                </p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Secure & Reliable
                </h3>
                <p className="text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                  Built with enterprise-grade security and 24/7 monitoring, our platform ensures 
                  your investments are safe. Join thousands of satisfied traders who trust CoinEX 
                  for their cryptocurrency needs.
                </p>
              </div>
            </div>

    

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                <span className="relative z-10">Buy Token</span>
                <svg className="ml-1 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </button>
              
              <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 transition-all duration-200">
                View Demo
                <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Crypto;