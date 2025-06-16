import React from 'react';
import Banner from './Banner';
import WhyChoose from './WhyChoose';
import SpecialOffers from './SpecialOffers';
import TopFeatures from './TopFeatures';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto m-5'>
         <Banner></Banner> 
         <WhyChoose></WhyChoose> 
         <SpecialOffers></SpecialOffers>
         <TopFeatures></TopFeatures>
        </div>
    );
};

export default Home;