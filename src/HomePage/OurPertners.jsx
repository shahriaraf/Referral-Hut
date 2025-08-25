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

const partners = [
  { id: 1, logo: FaGoogle, companyName: "Google" },
  { id: 2, logo: FaMicrosoft, companyName: "Microsoft" },
  { id: 3, logo: FaAmazon, companyName: "Amazon" },
  { id: 4, logo: FaApple, companyName: "Apple" },
  { id: 5, logo: FaMicrochip, companyName: "Intel" },
  { id: 6, logo: FaDatabase, companyName: "IBM" },
  { id: 7, logo: FaCode, companyName: "Adobe" },
  { id: 8, logo: FaVideo, companyName: "Netflix" },
  { id: 9, logo: FaLaptopCode, companyName: "Samsung" },
  { id: 10, logo: FaMusic, companyName: "Spotify" },
  { id: 11, logo: FaCar, companyName: "Tesla" },
  { id: 12, logo: FaCode, companyName: "NVIDIA" },
];

const OurPartners = () => {
  return (
    <div className="w-full py-16 primary_bg_color pb-30">
   <h1 className="text-center font-semibold text-4xl text-white tracking-widest">Our Partners</h1>

      <div className="mt-12">
        <Marquee pauseOnHover={true} speed={50} gradient={false}>
          {partners.map(({ id, logo: Icon, companyName }) => (
            <div
              key={id}
              className="partners_card flex flex-col items-center justify-center w-56 h-32 mx-4 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/15 hover:border-white/30 cursor-pointer"
            >
              {/* Icon */}
              <Icon className="company_logo text-white/80 text-4xl mb-2 transition-colors duration-300 hover:text-white" />


              {/* Company Name */}
              <span className="company_name text-white/90 font-medium text-lg">
                {companyName}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default OurPartners;