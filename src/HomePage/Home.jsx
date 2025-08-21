import React from 'react';
import RoutePrograms from '../Route Programs/RoutePrograms';
import Banner from './Banner';
import OurPertners from './OurPertners';

const Home = () => {
    return (
        <div className='primary_bg_color w-full h-auto'>
                    <Banner></Banner>
                     <OurPertners></OurPertners>
        </div>
    );
};

export default Home;