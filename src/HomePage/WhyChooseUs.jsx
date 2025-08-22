import React from "react";
import SectionTitle from "../Components/ComonSection/SectionTitle";

// icons
import icon_1 from "../../public/Images/whyChooseUs/choose_icon01.svg";
import icon_2 from "../../public/Images/whyChooseUs/choose_icon02.svg";
import icon_3 from "../../public/Images/whyChooseUs/choose_icon03.svg";
import icon_4 from "../../public/Images/whyChooseUs/choose_icon04.svg";

const outFeturedData = [
  {
    title: "Protect the identity",
    description: "Add new trending and rare artwork to your collection.",
    image: icon_1,
  },
  {
    title: "Security & control over money",
    description: "Add new trending and rare artwork to your collection.",
    image: icon_2,
  },
  {
    title: "Lifetime free transaction",
    description: "Add new trending and rare artwork to your collection.",
    image: icon_3,
  },
  {
    title: "Mobile payment make easy",
    description: "Add new trending and rare artwork to your collection.",
    image: icon_4,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why_choose_us_section common_padding primary_bg_color w-full ">
      <SectionTitle
        title_1="why choose us"
        title_2="Why choose our referral"
        text="token"
      ></SectionTitle>

      {/* cards */}
      <div className="featured_cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-16  mb-20 md:mb-28 lg:mb-32">
        {outFeturedData.map((data, index) => {
          return (
            <div className="card px-10 py-12 shadow-md border border-gray-800 rounded-lg hover:scale-105 transition-all easy-in duration-500 hover:border-purple-600">
              <div className="icon w-[80px] h-[80px] rounded-full bg-gray-800 flex justify-center text-center border-[3px] border-gray-500 ">
                <img src={data.image} alt="" />
              </div>

              <h2 className=" w-[80%] primary_text_color capitalize font-semibold md:text-xl my-6">
                {" "}
                {data.title}{" "}
              </h2>
              <p className="text-gray-400 capitalize font-normal text-sm ">
                {" "}
                {data.description}{" "}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
