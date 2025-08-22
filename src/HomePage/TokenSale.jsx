import React from "react";
import SectionTitle from "../Components/ComonSection/SectionTitle";

const tokenSaleData = [
  {
    stage: "Pre-Sale Stage 1",
    date: "15-1 May 2019",
    exchange_rate: "1 Ethereum = REC150",
    bonus: "40% bonus, 1 CoinEX ~ $14",
    token_amount: "21, 000, 000 STMX",
    value_in_usd: "(up to $0.75 million)",
  },
  {
    stage: "Pre-Sale Stage 2",
    date: "15-1 May 2019",
    exchange_rate: "1 ETH = up to 41, 000 STMX",
    bonus: "40% bonus, 1 CoinEX ~ $14",
    token_amount: "21, 000, 000 STMX",
    value_in_usd: "(up to $0.75 million)",
  },
  {
    stage: "Pre-Sale Stage 3",
    date: "15-1 May 2019",
    exchange_rate: "1 ETH = up to 41, 000 STMX",
    bonus: "40% bonus, 1 CoinEX ~ $14",
    token_amount: "21, 000, 000 STMX",
    value_in_usd: "(up to $0.75 million)",
  },
];

const TokenSale = () => {
  return (
    <section className="token_sale_section w-full primary_bg_color common_padding  ">
      <SectionTitle title_1={"token"} title_2={"Token Sale"}></SectionTitle>

      {/* token sale card */}
      <div className="token_sale_cards  grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5 mt-10 mb-20 md:mb-28 lg:mb-32">
        {tokenSaleData.map((data, index) => {
          return (
            <div
              key={index}
              className=" card capitalize rounded-lg border border-purple-600 text-center pb-10 hover:scale-105 transition-all easy-in duration-500"
            >
              <div className="stage secondary_bg_color text-white px-12 py-4 ">
                <h1 className="text-2xl lg:text-3xl font-semibold">
                  {" "}
                  {data.stage}{" "}
                </h1>
                <p className=" text-lg font-normal  mt-3 mb-8"> {data.date} </p>
              </div>
              <div className="details ">
                <h2 className="text-xl font-semibold text-white mt-3 mb-5">
                  {" "}
                  {data.exchange_rate}{" "}
                </h2>
                <p className=" text-base font-normal text-white">
                  {" "}
                  {data.bonus}{" "}
                </p>
                <p className=" text-base font-normal seondary_text_color my-2">
                  {" "}
                  {data.token_amount}{" "}
                </p>
                <p className=" text-base font-normal text-white">
                  {" "}
                  {data.value_in_usd}{" "}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TokenSale;
