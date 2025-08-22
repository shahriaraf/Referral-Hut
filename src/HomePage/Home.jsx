import React from 'react';
import Banner from './Banner';
import RoutePrograms from '../Route Programs/RoutePrograms';
import OurPertners from './OurPertners';
import WhyChooseUs from './WhyChooseUs';
import Crypto from './Crypto';
import Profile from '../Components/profile/Profile';
import Signup from '../Components/login/Signup/Signup';
import Login from '../Components/login/Signin/Login';

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