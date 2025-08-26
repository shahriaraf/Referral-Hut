// src/pages/Home.js

import React from 'react';
import Banner from './Banner';
import WhyChooseUs from './WhyChooseUs';
import Crypto from './Crypto';
import OurPertners from './OurPertners';


const Home = () => {
    return (
        
        <div className='relative w-full h-auto overflow-hidden'>
           
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black -z-10"></div>
            
            <div className="absolute top-0 -left-10 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 -right-10 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
            
            <div className="absolute top-20 right-20 w-20 h-20 border border-blue-500/30 rounded-lg transform rotate-45 animate-pulse hidden lg:block"></div>
            <div className="absolute bottom-40 left-20 w-16 h-16 border border-purple-500/30 rounded-full animate-bounce hidden lg:block"></div>
            
            <Banner />
            <WhyChooseUs />
            <Crypto />
            <OurPertners />
        </div>
    );
};

export default Home;