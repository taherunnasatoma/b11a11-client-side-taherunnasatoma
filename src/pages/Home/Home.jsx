import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import WhyChoose from './WhyChoose';
import SpecialOffers from './SpecialOffers';
import TopFeatures from './TopFeatures';
import RecentCars from './RecentCars';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://car-rental-server-coral.vercel.app/cars')
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load cars:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className='text-center mt-20 text-xl font-semibold'>Loading...</p>;
  }

  return (
    <div className='max-w-7xl mx-auto m-5'>
      <Banner />
      <RecentCars cars={cars} />
      <WhyChoose />
      <SpecialOffers />
      <TopFeatures />
    </div>
  );
};

export default Home;
