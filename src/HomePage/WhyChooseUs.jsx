import { motion } from "framer-motion";
import SectionTitle from "../Components/ComonSection/SectionTitle";
import icon_1 from "../../public/Images/whyChooseUs/choose_icon01.svg";
import icon_2 from "../../public/Images/whyChooseUs/choose_icon02.svg";
import icon_3 from "../../public/Images/whyChooseUs/choose_icon03.svg";
import icon_4 from "../../public/Images/whyChooseUs/choose_icon04.svg";

const outFeturedData = [
  {
    title: "Protect the Identity",
    description:
      "Advanced encryption and privacy protocols keep your personal information and trading activities completely secure and anonymous.",
    image: icon_1,
    color: "blue",
    stats: "256-bit SSL",
  },
  {
    title: "Security & Control Over Money",
    description:
      "Multi-signature wallets and cold storage solutions give you complete control over your funds with bank-level security.",
    image: icon_2,
    color: "green",
    stats: "99.9% Secure",
  },
  {
    title: "Lifetime Free Transaction",
    description:
      "Enjoy zero transaction fees for life on all your cryptocurrency trades and transfers with our premium membership.",
    image: icon_3,
    color: "purple",
    stats: "0% Fees",
  },
  {
    title: "Mobile Payment Made Easy",
    description:
      "Seamless mobile app experience with instant payments, QR code scanning, and one-tap trading on the go.",
    image: icon_4,
    color: "orange",
    stats: "Instant Pay",
  },
];

const colorVariants = {
  blue: {
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-900/20",
    border: "border-blue-700",
    icon: "bg-blue-800",
    text: "text-blue-400",
  },
  green: {
    gradient: "from-green-500 to-green-600",
    bg: "bg-green-900/20",
    border: "border-green-700",
    icon: "bg-green-800",
    text: "text-green-400",
  },
  purple: {
    gradient: "from-purple-500 to-purple-600",
    bg: "bg-purple-900/20",
    border: "border-purple-700",
    icon: "bg-purple-800",
    text: "text-purple-400",
  },
  orange: {
    gradient: "from-orange-500 to-orange-600",
    bg: "bg-orange-900/20",
    border: "border-orange-700",
    icon: "bg-orange-800",
    text: "text-orange-400",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const WhyChooseUs = () => {
  return (
    <section className="why_choose_us_section relative overflow-hidden bg-black w-full py-20 lg:py-32 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-20 right-20 w-20 h-20 border border-blue-500/30 rounded-lg transform rotate-45 animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-16 h-16 border border-purple-500/30 rounded-full animate-bounce"></div>

      <div className="relative common_padding max-w-7xl mx-auto">
        <SectionTitle
          title_1="why choose us"
          title_2="Why choose our BigTech"
          text="token"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-16">
          {[
            { value: "1M+", label: "Active Users" },
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Support" },
            { value: "150+", label: "Countries" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: idx * 0.2 },
                },
              }}
            >
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="featured_cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {outFeturedData.map((data, index) => {
            const colors = colorVariants[data.color];
            return (
              <motion.div
                key={index}
                className="card group relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.2 },
                  },
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 group-hover:border-white/30 transition-all duration-500 group-hover:scale-105"></div>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500`}
                ></div>

                {/* Card Content */}
                <div className="relative p-8 space-y-6">
                  <div className="relative">
                    <div
                      className={`icon w-20 h-20 rounded-2xl ${colors.icon} flex items-center justify-center border-2 ${colors.border} group-hover:border-opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      <img
                        src={data.image}
                        alt={`${data.title} icon`}
                        className="w-10 h-10 filter group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>
                    <div
                      className={`absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r ${colors.gradient} text-white text-xs font-semibold rounded-full shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300`}
                    >
                      {data.stats}
                    </div>
                  </div>
                  <h2 className="text-white font-bold text-xl leading-tight group-hover:text-white transition-colors duration-300">
                    {data.title}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {data.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-400 group-hover:text-white transition-all duration-300 cursor-pointer">
                    <span>Learn More</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <div
                    className={`absolute top-4 right-4 w-3 h-3 ${colors.bg} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-all duration-500 -z-10`}
                ></div>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          className="text-center mt-16 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white">
            Ready to Experience the Future of Crypto?
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join millions of users who trust our platform for secure, fast, and
            reliable cryptocurrency trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
            <button className="px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-200">
              Contact Sales
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
