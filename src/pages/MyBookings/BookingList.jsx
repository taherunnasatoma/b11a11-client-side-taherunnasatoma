import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { FaTrash, FaCalendarAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const BookingsList = ({ myBookingsPromise }) => {
  const { user } = useContext(AuthContext); 
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);

  const MySwal = withReactContent(Swal);

  
  useEffect(() => {
    if (user?.email) {
      myBookingsPromise(user.email)
        .then((data) => setBookings(data))
        .catch((err) => console.error('Booking fetch failed:', err));
    }
  }, [user, myBookingsPromise]);

  const handleCancel = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'You want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`https://car-rental-server-coral.vercel.app/bookings/${id}`, { status: 'Canceled' }).then(() => {
          setBookings(bookings.map(b => b._id === id ? { ...b, status: 'Canceled' } : b));
          Swal.fire('Canceled!', 'Booking has been canceled.', 'success');
        });
      }
    });
  };

  const handleModify = (booking) => {
    setEditingBooking(booking);
    setNewStartDate(new Date(booking.startDate));
    setNewEndDate(new Date(booking.endDate));
  };

  const handleConfirmModification = () => {
    axios.patch(`https://car-rental-server-coral.vercel.app/bookings/${editingBooking._id}`, {
      startDate: newStartDate,
      endDate: newEndDate,
    }).then(() => {
      const updated = bookings.map(b =>
        b._id === editingBooking._id
          ? { ...b, startDate: newStartDate, endDate: newEndDate }
          : b
      );
      setBookings(updated);
      setEditingBooking(null);
      Swal.fire('Updated!', 'Booking date updated.', 'success');
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings ({bookings.length})</h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Car Model</th>
              <th className="px-4 py-2 text-left">Booking Date</th>
              <th className="px-4 py-2 text-left">Total Price</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr
                key={booking._id}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
              >
                <td className="p-3">
                  <img src={booking.imageUrl} alt="car" className="w-16 h-12 object-cover rounded" />
                </td>
                <td className="p-3">{booking.carModel}</td>
                <td className="p-3">
                  {new Date(booking.startDate).toLocaleDateString()} -{' '}
                  {new Date(booking.endDate).toLocaleDateString()}
                </td>
                <td className="p-3">${booking.totalCost}</td>
                <td className="p-3 font-medium">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      booking.status === 'Canceled'
                        ? 'bg-red-200 text-red-800'
                        : booking.status === 'Pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-green-200 text-green-800'
                    }`}
                  >
                    {booking.status || 'Confirmed'}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleModify(booking)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <FaCalendarAlt /> Modify
                  </button>
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <FaTrash /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Modify Booking Dates</h3>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Start Date</label>
              <DatePicker
                selected={newStartDate}
                onChange={(date) => setNewStartDate(date)}
                selectsStart
                startDate={newStartDate}
                endDate={newEndDate}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">End Date</label>
              <DatePicker
                selected={newEndDate}
                onChange={(date) => setNewEndDate(date)}
                selectsEnd
                startDate={newStartDate}
                endDate={newEndDate}
                minDate={newStartDate}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingBooking(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmModification}
                className="btn bg-blue-500 text-white hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsList;
