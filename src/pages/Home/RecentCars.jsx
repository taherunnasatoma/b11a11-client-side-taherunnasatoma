import React, { useEffect, useState } from 'react';

const RecentCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('https://car-rental-server-coral.vercel.app/all-cars')
      .then(res => res.json())
      .then(data => {
        // Sort by date and pick the latest 6-8
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCars(sorted.slice(0, 8));
      });
  }, []);

  return (
    <section className="my-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Recent Listings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cars.map(car => (
          <div
            key={car._id}
            className="rounded-lg shadow-lg p-4 text-white transform transition duration-300 hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: '#9df3df' }}
          >
            <img
              src={car.imageUrl}
              alt={car.carModel}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{car.carModel}</h3>
            <p className="text-lg font-medium mb-2">${car.price}/day</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                car.availability === 'available' ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {car.availability}
            </span>
            <p className="text-sm">Booking Count: {car.bookingsCount || 0}</p>
            <p className="text-sm">
              Posted {Math.floor((Date.now() - new Date(car.createdAt)) / (1000 * 60 * 60 * 24)) || 0} days ago
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentCars;
