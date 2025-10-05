import React, { useState } from "react";
import circleImg from "../../public/Images/faq/download_icon_shape.svg";
import webIcon from "../../public/Images/faq/web.svg";
import androidIcon from "../../public/Images/faq/android.svg";
import IosIcon from "../../public/Images/faq/ios.svg";
import pcIcon from "../../public/Images/faq/pc.svg";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const platformIcons = [
  {
    id: 1,
    icon: webIcon,
  },
  {
    id: 2,
    icon: androidIcon,
  },
  {
    id: 3,
    icon: IosIcon,
  },
  {
    id: 4,
    icon: pcIcon,
  },
];

//   faq data
const faqData = [
  {
    id: 1,
    question: "What is blockchain?",
    answer:
      "Blockchain is a decentralized digital ledger that records transactions securely and transparently across multiple computers, making it tamper-resistant.",
  },
  {
    id: 2,
    question: "What is cryptocurrency?",
    answer:
      "Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates on blockchain technology. Examples include Bitcoin, Ethereum, and Solana.",
  },
  {
    id: 3,
    question: "How does a crypto wallet work?",
    answer:
      "A crypto wallet stores your private keys, allowing you to send, receive, and manage your digital assets securely. Wallets can be software-based (online/mobile) or hardware devices.",
  },
  {
    id: 4,
    question: "Is blockchain secure?",
    answer:
      "Yes, blockchain is secure due to its decentralized nature and cryptographic algorithms. However, security also depends on how you protect your private keys and use trusted platforms.",
  },
];

const Faq = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="faq_section primary_bg_color common_padding pb-32 flex flex-col lg:flex-row gap-20">
      {/* available platforms */}
      <div className="available_platform primary_text_color w-full lg:w-[40%]">
        <h2 className="text-base  uppercase font-semibold">
          {" "}
          available platform{" "}
        </h2>
        <h1 className="text-3xl md:text-4xl lg:text-[45px] font-bold my-6">
          {" "}
          Our Iconic is available in multi-device{" "}
        </h1>
        <p className="text-base capitalize text-gray-400">
          Try it now for free on iOS, Android, PC, Web - whatever your flavor,
          we’ve got you covered.
        </p>

        <div className="platform_icons flex gap-4 mt-10">
          {platformIcons.map((data, index) => {
            return (
              <div key={index}>
                <div className="img relative ">
                  <img src={circleImg} alt="" />
                  <div className="logo absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={data.icon} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* faq section  */}
      <div className="faq lg:w-[50%] px-4">
        <div className="space-y-4">
          {faqData.map(({ id, question, answer }) => (
            <div
              key={id}
              className="bg-transparent rounded-xl shadow-md overflow-hidden transition-all"
            >
              {/* Question Row */}
              <div
                className={`flex gap-4 items-center p-4 cursor-pointer border-t border-gray-700 ${
                  id === 4 ? "border-b" : ""
                }`}
                onClick={() => toggleFAQ(id)}
              >
                <button className="text-xl font-bold text-gray-800">
                  {activeId === id ? (
                    <div className="w-[30px] h-[30px] bg-purple-600 rounded-full flex justify-center items-center">
                      <MdClose className="text-base text-white" />
                    </div>
                  ) : (
                    <div className="w-[30px] h-[30px] bg-purple-600 rounded-full flex justify-center items-center">
                      <FaPlus className="text-base text-white" />
                    </div>
                  )}
                </button>
                <p className="font-semibold text-white text-[22px] py-1 ">
                  {question}
                </p>
              </div>

              {/* Animated Answer Row */}
              <AnimatePresence>
                {activeId === id && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="pl-16 pt-2 pb-3 bg-transparent text-gray-400 overflow-hidden"
                  >
                    {answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
