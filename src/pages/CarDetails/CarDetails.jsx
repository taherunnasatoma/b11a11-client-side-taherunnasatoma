import React from 'react';
import { Link, useLoaderData } from 'react-router';

const CarDetails = () => {
  const car = useLoaderData();
  

  const {
    _id,
    carModel,
    price,
    availability,
    imageUrl,
    features,
    description,
    location,
  } = car;

 

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden md:flex">
        <img
          src={imageUrl}
          alt={carModel}
          className="w-full md:w-1/2 object-cover h-96"
        />
        <div className="p-6 flex-1">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{carModel}</h2>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Price:</strong> ${price}/day
          </p>
          <p className="text-md mb-2">
            <strong>Status:</strong>{' '}
            <span
              className={`font-semibold ${
                availability === 'available' ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {availability}
            </span>
          </p>
          <p className="mb-4">
            <strong>Location:</strong> {location}
          </p>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Features:</h4>
            <div className="flex flex-wrap gap-2">
              {features?.map((feature, idx) => (
                <span
                  key={idx}
                  className="bg-[#05e9b4] text-white px-3 py-1 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Description:</h4>
            <p className="text-gray-700">{description}</p>
          </div>

          <Link to={`/carBooking/${_id}`}>
          <button
            
            className="btn bg-[#05e9b4] hover:bg-[#04c79a] text-white px-6 py-2 rounded-md"
          >
            Book Now
          </button>
          
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
