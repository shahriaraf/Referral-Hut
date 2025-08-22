import React from "react";
import banner_img from "../../public/Images/Banner/banner.png";

const Banner = () => {
  return (
    <section className="banner_section relative w-full min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      
      <div className="relative common_padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[90vh] py-10">
          
          {/* Content Section */}
          <div className="banner_cnt space-y-8 lg:pr-8">
           
            
            {/* Main Heading */}
            <h1 className="primary_text_color text-4xl sm:text-5xl lg:text-6xl  font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Token Creative
              </span>
              <br />
              <span className="text-gray-800 text-5xl dark:text-gray-200">
                of CoinEX Theme
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-lg leading-relaxed max-w-2xl">
              Experience the future of cryptocurrency trading with our innovative, 
              user-friendly platform designed for both beginners and professionals.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                <span className="relative z-10">Buy Token</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                <svg className="ml-1 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 transition-all duration-200">
                Learn More
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            
            {/* Stats/Features */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-purple-600">99.9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="banner_img relative order-first lg:order-last">
            <div className="relative">
              {/* Decorative background for image */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl transform -rotate-6 scale-105 opacity-20"></div>
              
              {/* Main image container */}
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-2xl">
                <img 
                  src={banner_img} 
                  className="w-full h-auto rounded-2xl" 
                  alt="CoinEX Theme Banner - Modern cryptocurrency trading interface"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;