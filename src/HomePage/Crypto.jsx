import React from "react";
import img from "../../public/Images/Crypto/09.png";

const Crypto = () => {
  return (
    <section className="banner_section w-full common_padding  grid grid-cols-2 gap-10 mt-32">
      <div className="img">
        <img src={img} className="w-full" alt="banner-image" />
      </div>

      <div className="banner_cnt">
        <h1 className="primary_text_color text-base uppercase tracking-[6px]">
          what is crypto
        </h1>
        <h2 className="primary_text_color lowercase text-6xl font-semibold my-6">
          coinex built a platform to buy and sell shares.
        </h2>

                <p className="text-gray-400">
Here is 3 Easy Steps to Busy & Sell Bitcoin. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
<br /> <br />
Here is 3 Easy Steps to Busy & Sell Bitcoin. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

                </p>
        <div className="banner_button mt-5">
          <div className="primary_btn">bye token</div>
        </div>
      </div>
    </section>
  );
};

export default Crypto;
