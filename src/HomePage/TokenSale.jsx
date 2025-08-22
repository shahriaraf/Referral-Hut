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
      <SectionTitle title_1={"token Sale"} title_2={"Empowering Your Token Journey"}></SectionTitle>

      {/* token sale card */}
      <div className="token_sale_cards  grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5 mt-10 mb-20 md:mb-28 lg:mb-32">
        {tokenSaleData.map((data, index) => {
          return (
        <div
  key={index}
  className="relative bg-black rounded-xl border border-purple-500 p-6 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transform hover:scale-105 transition-all duration-500"
>
  <div className="text-center mb-10">
    <h1 className="text-3xl font-bold text-purple-400">{data.stage}</h1>
    <p className="text-sm text-purple-300 mt-4">{data.date}</p>
  </div>
  <div className="text-center space-y-2">
    <h2 className="text-xl font-semibold text-white">{data.exchange_rate}</h2>
    <p className="text-base text-purple-300">{data.bonus}</p>
    <p className="text-base text-gray-400">{data.token_amount}</p>
    <p className="text-lg font-bold text-green-400">{data.value_in_usd}</p>
  </div>
</div>

          );
        })}
      </div>
    </section>
  );
};

export default TokenSale;
