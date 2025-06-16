import React from 'react';
import Banner from './Banner';
import WhyChoose from './WhyChoose';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto m-5'>
         <Banner></Banner> 
         <WhyChoose></WhyChoose> 
        </div>
    );
};

export default Home;