import React, { useState, use } from 'react';
import { useParams, useLoaderData, Navigate } from 'react-router';

import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import axios from 'axios';

const CarBooking = () => {
  const { user } = use(AuthContext);
  const car = useLoaderData();
  const { carModel, availability, price, location,imageUrl } = car;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  if (!user) return <Navigate to="/login" replace />;

  const getDayDifference = (start, end) => {
    const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
    return Math.max(Math.round(diff), 1);
  };

 const handleConfirmBooking = () => {
  if (!startDate || !endDate) {
    return Swal.fire('Error', 'Please select both start and end dates.', 'error');
  }

  const totalDays = getDayDifference(startDate, endDate);
  const totalCost = totalDays * price;

  const booking = {
    bookingId: car._id,
    applicant: user.email,
    carModel,
    availability,
    price,
    location,
    startDate,
    endDate,
    totalCost,
    imageUrl
  };

  axios.post('https://car-rental-server-coral.vercel.app/bookings', booking)
    .then(res => {
      console.log(res.data);
      Swal.fire({
        title: 'Booking Confirmed!',
        text: `You have booked ${carModel} for ${totalDays} days. Total cost: $${totalCost}`,
        icon: 'success',
        confirmButtonColor: '#05e9b4',
      });
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error', 'Booking failed. Try again.', 'error');
    });
};

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <img src={imageUrl} alt="" />
      <h2 className="text-xl font-bold mb-4">Booking: {carModel}</h2>
      <p><strong>Availability:</strong> {availability}</p>
      <p><strong>Price:</strong> ${price} / day</p>
      <p><strong>Location:</strong> {location}</p>

      <div className="my-4">
        <label className="block mb-1 font-semibold">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="input input-bordered w-full"
        />
      </div>

      <div className="my-4">
        <label className="block mb-1 font-semibold">End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleConfirmBooking}
          className="btn bg-[#65bbd6] hover:bg-[#04a3c7] text-white"
        >
          Confirm
        </button>
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline border-gray-400 text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CarBooking;
