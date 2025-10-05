import React from "react";
import Marquee from "react-fast-marquee";
import {
  FaGoogle,
  FaMicrosoft,
  FaAmazon,
  FaApple,
  FaMicrochip,
  FaCar,
  FaCode,
  FaLaptopCode,
  FaMusic,
  FaVideo,
  FaDatabase,
} from "react-icons/fa";

// Data for the partners marquee
const partners = [
  { id: 1, logo: FaGoogle, companyName: "Google" },
  { id: 2, logo: FaMicrosoft, companyName: "Microsoft" },
  { id: 3, logo: FaAmazon, companyName: "Amazon" },
  { id: 7, logo: FaCode, companyName: "Adobe" },
  { id: 8, logo: FaVideo, companyName: "Netflix" },
  { id: 9, logo: FaLaptopCode, companyName: "Samsung" }
];

const OurPartners = () => {
  return (
    
    <section className="w-full py-20 lg:py-32">
      {/* Title Section */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase">
          Trusted By The Best
        </h2>
        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Our Technology{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Partners
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          We collaborate with industry leaders to build a secure and innovative ecosystem for our users.
        </p>
      </div>

      {/* Marquee Section */}
      <div>
        <Marquee pauseOnHover={true} speed={50} gradient={false}>
          {partners.map(({ id, logo: Icon, companyName }) => (
            <div
              key={id}
              className="partners_card flex flex-col items-center justify-center w-56 h-32 mx-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/15 hover:border-white/30 cursor-pointer"
            >
              <Icon className="company_logo text-white/80 text-4xl mb-2 transition-transform duration-300 group-hover:scale-110" />
              <span className="company_name text-white/90 font-medium text-lg">
                {companyName}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default OurPartners;