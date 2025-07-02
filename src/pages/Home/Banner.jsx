import React from 'react';
import { Link } from 'react-router'; 
import bannerImage from '../../assets/banner_car2.webp';

const Banner = () => {
  return (
    <section
      className="relative h-[60vh] md:h-[70vh] w-full bg-cover bg-center rounded-xl"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="absolute inset-0  bg-opacity-60 flex items-center justify-center px-4">
        <div className="text-center text-white max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 drop-shadow-lg leading-tight">
            Drive Your Dreams Today!
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 drop-shadow max-w-xl mx-auto">
            Discover a wide range of affordable and luxury cars for every journey.
          </p>
          <Link to="/available_cars">
            <button className="bg-white text-[#65bbd6] font-bold px-6 py-3 rounded-full text-base sm:text-lg hover:bg-white transition duration-300 shadow-lg">
              View Available Cars
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
