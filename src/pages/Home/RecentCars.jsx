import React, { useEffect, useState } from 'react';

const RecentCars = () => {
  const [cars, setCars] = useState([]);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    fetch('https://car-rental-server-coral.vercel.app/all-cars')
      .then(res => res.json())
      .then(data => {
        handleSort(data, sortBy);
      });
  }, [sortBy]);

  const handleSort = (data, criteria) => {
    let sorted = [];
    if (criteria === 'latest') {
      sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (criteria === 'lowPrice') {
      sorted = data.sort((a, b) => a.price - b.price);
    } else if (criteria === 'highPrice') {
      sorted = data.sort((a, b) => b.price - a.price);
    }
    setCars(sorted.slice(0, 8));
  };

  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-[#65bbd6] to-[rgba(30,155,153,0.14)] rounded-xl mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-4xl font-bold text-white text-center">🚘 Recent Listings</h2>
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-white">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white border-none text-sm"
            >
              <option value="latest">Latest</option>
              <option value="lowPrice">Price: Low to High</option>
              <option value="highPrice">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.map(car => (
            <div
              key={car._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-4 flex flex-col"
            >
              <img
                src={car.imageUrl}
                alt={car.carModel}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-black">{car.carModel}</h3>
              <p className="text-lg font-bold text-[#65bbd6] mb-1">${car.price}/day</p>
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-2 ${
                  car.availability === 'available' ? 'bg-[#65bbd6] text-white' : 'bg-red-100 text-red-800'
                }`}
              >
                {car.availability}
              </span>
              <p className="text-sm text-gray-500 mb-1">Bookings: {car.bookingsCount || 0}</p>
              <p className="text-sm text-gray-500">
                Posted {Math.floor((Date.now() - new Date(car.createdAt)) / (1000 * 60 * 60 * 24)) || 0} days ago
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentCars;
