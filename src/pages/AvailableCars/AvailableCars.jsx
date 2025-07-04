import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; 

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('dateNewest');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
  fetch('https://carrental-pi.vercel.app/all-cars')
    .then(res => res.json())
    .then(data => {
     const availableCars = data.filter(car => car.availability.toLowerCase() === 'available');

      setCars(availableCars);
    });
}, []);

  const sortCars = (cars, criteria) => {
    let sorted = [...cars];
    switch (criteria) {
      case 'dateNewest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'dateOldest':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priceLow':
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'priceHigh':
        sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }
    return sorted;
  };

  const filteredCars = cars.filter(car => {
    return (
      car.carModel.toLowerCase().includes(searchTerm) ||
      (car.brand && car.brand.toLowerCase().includes(searchTerm)) ||
      car.location.toLowerCase().includes(searchTerm)
    );
  });

  const sortedCars = sortCars(filteredCars, sortBy);

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Cars</h1>

      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">

        {/* 🔍 Search Bar */}
        <div className="w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search by model, brand, or location"
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>

       
        <div className="flex items-center gap-4">
          <div>
            <button
              onClick={() => setView('grid')}
              className={`btn mr-2 ${view === 'grid' ? 'bg-[#65bbd6] text-white' : 'bg-gray-200'}`}
            >
              Grid View
            </button>
            <button
              onClick={() => setView('list')}
              className={`btn ${view === 'list' ? 'bg-[#65bbd6] text-white' : 'bg-gray-200'}`}
            >
              List View
            </button>
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="select select-bordered"
          >
            <option value="dateNewest">Date Added: Newest First</option>
            <option value="dateOldest">Date Added: Oldest First</option>
            <option value="priceLow">Price: Lowest First</option>
            <option value="priceHigh">Price: Highest First</option>
          </select>
        </div>
      </div>

      {/* Car Display */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedCars.map(car => (
            <div key={car._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
              <img
                src={car.imageUrl}
                alt={car.carModel}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{car.carModel}</h3>
              
              <p className="text-gray-700 mb-1">Price: ${car.price} / day</p>
              <p className="text-gray-700 mb-3">Location: {car.location}</p>
              <Link
                to={`/cars/${car._id}`}
                className="mt-auto inline-block bg-[#65bbd6] text-white px-4 py-2 rounded hover:bg-[#0455c7e3] text-center"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedCars.map(car => (
            <div key={car._id} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
              <img
                src={car.imageUrl}
                alt={car.carModel}
                className="w-32 h-20 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">{car.carModel}</h3>
                <p className="text-gray-700">Brand: {car.brand || 'Unknown'}</p>
                <p className="text-gray-700">Price: ${car.price} / day</p>
                <p className="text-gray-700">Location: {car.location}</p>
              </div>
              <Link
                to={`/cars/${car._id}`}
                className="inline-block bg-[#65bbd6] text-white px-4 py-2 rounded hover:bg-[#04b0c7]"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
