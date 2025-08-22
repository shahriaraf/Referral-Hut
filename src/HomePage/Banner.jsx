import React from "react";
import banner_img from "../../public/Images/Banner/banner.png";

const Banner = () => {
  return (
    <section className="banner_section w-full common_padding min-h-screen grid grid-cols-2 gap-10 items-center">
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
        <img src={banner_img} className="w-[80%] mx-auto" alt="banner-image" />
      </div>
    </section>
  );
};

export default Banner;