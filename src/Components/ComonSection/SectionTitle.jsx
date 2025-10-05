import React from "react";




const SectionTitle = ({ title_1, title_2, text }) => {
  return (
    <div className=" text-center ">
      <h1
        className={`${
          title_1
            ? "primary_text_color  text-5xl  font-semibold uppercase mb-4 text-center"
            : ""
        }`}
      >
        {" "}
        {title_1}{" "}
      </h1>
      <h1
        className={`${
          title_2
            ? "primary_text_color text-2xl  font-semibold capitalize text-center"
            : ""
        }`}
      >
        {" "}
        {title_2}{" "}
      </h1><p className={`${text ? 'text-purple-600 text-2xl  font-semibold capitalize mt-1' : ''}`}> {text} </p>
      
    </div>
  );
};

export default SectionTitle;
