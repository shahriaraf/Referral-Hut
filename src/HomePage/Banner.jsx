
import React from "react";
import banner_img from "../../public/Images/Banner/banner.png";

const Banner = () => {
  return (
    <section className="banner_section w-full common_padding h-[600px] sm:h-[400px] lg:h-[550px] max-h-[650px]  grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-10 items-center mb-20 sm:mb-14 md:mb-10 lg:mb-6">
      <div className="banner_cnt">
        <h1 className="primary_text_color text-xl  sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold capitalize">
          Token creative of CoinEX Theme
        </h1>
        <p className="primary_text_color my-10 capitalize">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
          iure nesciunt a provident incidunt. Ad!
        </p>
        <div className="banner_button">
          <div className="primary_btn">bye token</div>
        </div>
      </div>
      <div className="banner_img">
        <img src={banner_img} className="w-[80%] sm:w-full lg:w-[80%] mx-auto" alt="banner-image" />
      </div>
    </section>
  );
};

export default Banner;

