import React from 'react';
import { Link } from 'react-router';
import bannerImage from '../../assets/banner_car2.webp'

const Banner = () => {
    return (
        <div>
            <section className=" rounded-xl relative h-[70vh] w-full bg-cover bg-center" style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className="absolute inset-0 bg-opacity-60 flex items-center justify-center px-4">
        <div className="text-center text-white max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Drive Your Dreams Today!
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow">
            Discover a wide range of affordable and luxury cars for every journey.
          </p>
          <Link to="/available_cars">
            <button className="bg-white text-[#65bbd6] font-bold px-8 py-3 rounded-full text-lg hover:bg-white transition duration-300 shadow-lg">
              View Available Cars
            </button>
          </Link>
        </div>
      </div>
    </section>
        </div>
    );
};

export default Banner;