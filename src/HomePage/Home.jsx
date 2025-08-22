import React from 'react';
import Banner from './Banner';
import RoutePrograms from '../Route Programs/RoutePrograms';
// import Banner from './Banner';
import OurPertners from './OurPertners';
import WhyChooseUs from './WhyChooseUs';
import Crypto from './Crypto';
import TokenSale from './TokenSale';
import Faq from './Faq';

const Home = () => {
    return (
        <div className='primary_bg_color w-full h-auto'>
                    <Banner></Banner>
                     <OurPertners></OurPertners>
                     <WhyChooseUs></WhyChooseUs>
                     <Crypto></Crypto>
                      <TokenSale></TokenSale>
                       <Faq></Faq>
        </div>
    );
};

export default Home;