import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";

const socialLinks = [
  { id: 1, icon: <FaFacebook></FaFacebook> },
  { id: 2, icon: <FaInstagram></FaInstagram> },
  { id: 3, icon: <FaYoutube></FaYoutube> },
  { id: 4, icon: <FaTwitter></FaTwitter> },
];

const Footer = () => {
  return (
<div>
        <footer className=" text-white common_padding bg-gradient-to-r from-[#151C2B] via-[#2C3548] to-gray-800   bg-base-200 text-base-content grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-8 py-20">
      {/* footer section 1 */}
      <div className="footer_section_1">
        {/* Logo - navbar-start */}
        <div className=" flex items-center gap-x-2">
          <RiVipCrownFill className="text-3xl seondary_text_color" />
          <h2 className="text-xl font-semibold seondary_text_color">
            Referal<span className="primary_text_color">Hut</span>
          </h2>
        </div>

        <p className="text-gray-400 my-8">
          A new way to make the payments easy, reliable and 100% secure.
          claritatem itamconse quat. Exerci tationulla{" "}
        </p>

        <div className="social_links flex gap-5">
          {socialLinks.map((data, index) => {
            return (
              <div
                key={data.id}
                className="w-[48px] h-[48px] rounded-full border border-purple-600 flex justify-center items-center text-xl text-white hover:bg-purple-600 hover:border-none"
              >
                {data.icon}
              </div>
            );
          })}
        </div>
      </div>

      {/* footer section 2 */}
      <div className="footer_section_2">
        <h6 className="footer_link_title">Useful Links</h6>
        {/* footer links */}
        <div className="footer_links">
          <a className="link link-hover">Contact us</a>
          <a className="link link-hover">How It Works</a>
          <a className="link link-hover">Creat</a>
          <a className="link link-hover">Explore</a>
          <a className="link link-hover">Terms & Condition</a>
        </div>
      </div>

      {/* footer section 3 */}
      <div className="footer_section_3">
        <h6 className="footer_link_title">Community</h6>

        <div className="footer_links">
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Help Center</a>
          <a className="link link-hover">Partners</a>
          <a className="link link-hover">Blog</a>
          <a className="link link-hover">Newsletters</a>
        </div>
      </div>

      {/* footer section 4 */}

      <div className="footer_section_4">
        <h6 className="footer_link_title">Subscribe Newsletter</h6>

        <p className="text-gray-400 my-8">
          Exerci tation ullamcorper suscipit lobortis nisl aliquip ex ea commodo
        </p>

        <div className=" flex ">
          <input
            type="text"
            className="input  bg-[#132031] h-[65px] "
            placeholder="Info@gmail.com"
          />
          <button className=" bg-purple-600  h-[63px] px-5 rounded-tr-md rounded-br-md">
            {" "}
            <FaTelegramPlane className="text-2xl cursor-pointer"></FaTelegramPlane>{" "}
          </button>
        </div>
      </div>

    </footer>

    
                {/* copy  */}
                      <div className=" w-full border-t border-gray-700 bg-gradient-to-r from-[#151C2B] via-[#2C3548] to-gray-800 text-gray-400 py-6  md:px-20">
            <div className=" mb-6"></div>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
                {/* Copyright Section */}
                <div className="mb-4 md:mb-0">
                    <span>Copyright © 2023 Bigtech All Rights Reserved.</span>
                </div>

                {/* Links Section */}
                <div className="flex space-x-6 md:space-x-10">
                    <a href="#" className="hover:text-white transition-colors duration-300">
                        Terms and conditions
                    </a>
                    <a href="#" className="hover:text-white transition-colors duration-300">
                        Privacy policy
                    </a>
                </div>
            </div>
        </div>
</div>


  );
};

export default Footer;
