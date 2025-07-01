import React from 'react';

import errorGif from '../../assets/404_error.jpg'; 
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <img
        src={errorGif}
        alt="404 Not Found"
        className="max-w-md w-full mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-6">
        The page you are looking for doesn’t exist or was moved.
      </p>
      <Link to="/">
        <button className="bg-[#65bbd6] text-black px-6 py-3 rounded-full font-semibold shadow hover:bg-white transition">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
