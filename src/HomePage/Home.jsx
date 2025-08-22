import React from 'react';
import Banner from './Banner';
import RoutePrograms from '../Route Programs/RoutePrograms';
import OurPertners from './OurPertners';
import WhyChooseUs from './WhyChooseUs';
import Crypto from './Crypto';

const Home = () => {
    return (
        <div className='primary_bg_color w-full h-auto'>
                    <Banner></Banner>
                     <WhyChooseUs></WhyChooseUs>
                     <Crypto></Crypto>
                     <OurPertners></OurPertners>
        </div>
    );
};

export default Home;