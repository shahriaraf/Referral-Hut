import React from "react";
import SectionTitle from "../Components/ComonSection/SectionTitle";

// icons
import icon_1 from "../../public/Images/whyChooseUs/choose_icon01.svg";
import icon_2 from "../../public/Images/whyChooseUs/choose_icon02.svg";
import icon_3 from "../../public/Images/whyChooseUs/choose_icon03.svg";
import icon_4 from "../../public/Images/whyChooseUs/choose_icon04.svg";

const outFeturedData = [
  {
    "title": "Protect the Identity",
    "description": "Advanced encryption and privacy protocols keep your personal information and trading activities completely secure and anonymous.",
    "image": icon_1,
    "color": "blue",
    "stats": "256-bit SSL"
  },
  {
    "title": "Security & Control Over Money",
    "description": "Multi-signature wallets and cold storage solutions give you complete control over your funds with bank-level security.",
    "image": icon_2,
    "color": "green",
    "stats": "99.9% Secure"
  },
  {
    "title": "Lifetime Free Transaction",
    "description": "Enjoy zero transaction fees for life on all your cryptocurrency trades and transfers with our premium membership.",
    "image": icon_3,
    "color": "purple",
    "stats": "0% Fees"
  },
  {
    "title": "Mobile Payment Made Easy",
    "description": "Seamless mobile app experience with instant payments, QR code scanning, and one-tap trading on the go.",
    "image": icon_4,
    "color": "orange",
    "stats": "Instant Pay"
  }
];

const colorVariants = {
  blue: {
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-700",
    icon: "bg-blue-100 dark:bg-blue-800",
    text: "text-blue-600 dark:text-blue-400"
  },
  green: {
    gradient: "from-green-500 to-green-600",
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-700",
    icon: "bg-green-100 dark:bg-green-800",
    text: "text-green-600 dark:text-green-400"
  },
  purple: {
    gradient: "from-purple-500 to-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-700",
    icon: "bg-purple-100 dark:bg-purple-800",
    text: "text-purple-600 dark:text-purple-400"
  },
  orange: {
    gradient: "from-orange-500 to-orange-600",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-700",
    icon: "bg-orange-100 dark:bg-orange-800",
    text: "text-orange-600 dark:text-orange-400"
  }
};

const WhyChooseUs = () => {
  return (

    <section className="why_choose_us_section w-full py-10 lg:py-14">
      <div className="relative common_padding max-w-7xl mx-auto">
        <SectionTitle
          title_1="why choose us"
          title_2="Why choose our BigTech"
          text='token'
        />

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-16">
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-white">1M+</div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-sm text-gray-400">Support</div>
          </div>
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-white">150+</div>
            <div className="text-sm text-gray-400">Countries</div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="featured_cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {outFeturedData.map((data, index) => {
            const colors = colorVariants[data.color];
            return (
              <div
                key={index}
                className="card group relative"
              >

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:border-white/30 transition-all duration-500 group-hover:scale-105"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500`}></div>

                {/* Card Content */}
                <div className="relative p-8 space-y-6">
                  {/* Icon Container */}
                  <div className="relative">
                    <div className={`icon w-20 h-20 rounded-2xl ${colors.icon} flex items-center justify-center border-2 ${colors.border} group-hover:border-opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <img
                        src={data.image}
                        alt={`${data.title} icon`}
                        className="w-10 h-10 filter group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>

                    {/* Stats Badge */}
                    <div className={`absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r ${colors.gradient} text-white text-xs font-semibold rounded-full shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
                      {data.stats}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-white font-bold text-xl leading-tight group-hover:text-white transition-colors duration-300">
                    {data.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {data.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-400 group-hover:text-white transition-all duration-300 cursor-pointer">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Decorative corner element */}
                  <div className={`absolute top-4 right-4 w-3 h-3 ${colors.bg} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-all duration-500 -z-10`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-6">
          <h3 className="text-2xl font-bold text-white">
            Ready to Experience the Future of Crypto?
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join millions of users who trust our platform for secure, fast, and reliable cryptocurrency trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

          
            <button className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              <span className="relative z-10">Get Started Today</span>
              
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
            </button>

          
            <div className="group relative inline-flex p-[2px] bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
             
              <button className="inline-flex items-center justify-center w-full h-full px-6 py-3 bg-gray-900 rounded-full transition-colors duration-300 group-hover:bg-gray-800">
                <span className="font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Contact Sales
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;