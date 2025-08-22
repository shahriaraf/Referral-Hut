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
import SectionTitle from "../Components/ComonSection/SectionTitle";

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
    <div className="w-full py-6 primary_bg_color mb-20">
      <SectionTitle title_1={"our top pertners"}></SectionTitle>

      <Marquee pauseOnHover={true} speed={50} gradient={false}>
        {partners.map(({ id, logo: Icon, companyName }) => (
      <div
  key={id}
  className=" pertners_card relative flex flex-col items-center justify-center w-52 h-28 mx-4 mt-4 rounded-xl border border-gray-700 bg-black/60 shadow-md transition-transform duration-300 hover:scale-105 "
>
  {/* 4 dot */}
  <span className="absolute top-2 left-2 w-1.5 h-1.5 bg-[#2A2C3C] rounded-full"></span>
  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#2A2C3C] rounded-full"></span>
  <span className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-[#2A2C3C] rounded-full"></span>
  <span className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#2A2C3C] rounded-full"></span>

  {/* Icon */}
  <Icon className=" company_logo text-gray-300 text-4xl mb-2" />

  {/* Company Name */}
  <span className=" company_name text-gray-300 font-medium text-2xl">
    {companyName}
  </span>
</div>

        ))}
      </Marquee>
    </div>
  );
};

export default OurPartners;
