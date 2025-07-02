import React, { useState, use } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router';

const MyCarsList = ({ carsCreatedByPromise }) => {
  const cars = use(carsCreatedByPromise);
  const MySwal = withReactContent(Swal);

  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    model: '',
    dailyPrice: '',
    availability: '',
    regNumber: '',
    features: '',
    description: '',
    images: '',
    location: '',
  });

  const [carsState, setCars] = useState(cars);

  const openEditModal = (car) => {
    setEditingCar(car);
    setFormData({
      model: car.carModel || '',
      dailyPrice: car.price || '',
      availability: car.availability || '',
      regNumber: car.registrationNumber || '',
      features: car.features || '',
      description: car.description || '',
      images: car.imageUrl || '',
      location: car.location || '',
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.model.trim()) {
      MySwal.fire('Error', 'Car Model is required', 'error');
      return;
    }
    if (!formData.dailyPrice || isNaN(formData.dailyPrice)) {
      MySwal.fire('Error', 'Daily Rental Price must be a number', 'error');
      return;
    }

    try {
      const res = await fetch(`https://carrental-pi.vercel.app/cars/${editingCar._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carModel: formData.model,
          price: parseFloat(formData.dailyPrice),
          availability: formData.availability,
          regNumber: formData.regNumber,
          features: formData.features,
          description: formData.description,
          images: formData.images,
          location: formData.location,
        }),
      });

      if (!res.ok) throw new Error('Failed to update car');

      const updatedCar = {
        ...editingCar,
        carModel: formData.model,
        price: parseFloat(formData.dailyPrice),
        availability: formData.availability,
        regNumber: formData.regNumber,
        features: formData.features,
        description: formData.description,
        images: formData.images,
        location: formData.location,
      };

      setCars((prev) => prev.map((c) => (c._id === updatedCar._id ? updatedCar : c)));
      MySwal.fire('Success', 'Car updated successfully', 'success');
      setEditingCar(null);
    } catch (error) {
      MySwal.fire('Error', error.message, 'error');
    }
  };

  const onDelete = (carId) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the car.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://carrental-pi.vercel.app/cars/${carId}`, {
            method: 'DELETE',
          });
          if (!res.ok) throw new Error('Failed to delete car');
          setCars((prev) => prev.filter((c) => c._id !== carId));
          MySwal.fire('Deleted!', 'Your car has been deleted.', 'success');
        } catch (error) {
          MySwal.fire('Error', error.message, 'error');
        }
      }
    });
  };

  if (carsState.length === 0) {
    return (
      <div className="text-center p-10">
        <p className="mb-4 text-lg">You have not added any cars yet.</p>
        <Link to="/addCar" className="btn bg-[#65bbd6] text-white">
          Add Car
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Added Cars ({carsState.length})</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Car Image</th>
              <th className="p-3 border">Car Model</th>
              <th className="p-3 border">Daily Rental Price</th>
              <th className="p-3 border">Booking Count</th>
              <th className="p-3 border">Availability</th>
              <th className="p-3 border">Date Added</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {carsState.map((car) => (
              <tr key={car._id} className="hover:bg-gray-50">
                <td className="p-2 border text-center">
                  <img
                    src={car.imageUrl}
                    alt={car.carModel}
                    className="w-20 h-12 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-3 border">{car.carModel}</td>
                <td className="p-3 border">${car.price}</td>
                <td className="p-3 border">{car.bookingCount || 0}</td>
                <td className="p-3 border">{car.availability}</td>
                <td className="p-3 border">{new Date(car.createdAt).toLocaleDateString()}</td>
                <td className="p-3 border space-x-2">
                  <button className="btn btn-sm btn-info" onClick={() => openEditModal(car)}>
                    Update
                  </button>
                  <button className="btn btn-sm btn-error" onClick={() => onDelete(car._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editingCar && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={onSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto"
          >
            <h3 className="text-xl font-semibold mb-4">Update Car Details</h3>

            <label className="block mb-2 font-semibold">
              Car Model
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={onChange}
                className="input input-bordered w-full mt-1"
                required
              />
            </label>

            <label className="block mb-2 font-semibold">
              Daily Rental Price
              <input
                type="number"
                name="dailyPrice"
                value={formData.dailyPrice}
                onChange={onChange}
                className="input input-bordered w-full mt-1"
                min="0"
                required
              />
            </label>

            <label className="block mb-2 font-semibold">
              Availability
              <select
                name="availability"
                value={formData.availability}
                onChange={onChange}
                className="input input-bordered w-full mt-1"
                required
              >
                <option value="">Select</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </label>

            <label className="block mb-2 font-semibold">
              Vehicle Registration Number
              <input
                type="text"
                name="regNumber"
                value={formData.regNumber}
                onChange={onChange}
                className="input input-bordered w-full mt-1"
              />
            </label>

            <label className="block mb-2 font-semibold">
              Features (comma separated)
              <input
                type="text"
                name="features"
                value={formData.features}
                onChange={onChange}
                className="input input-bordered w-full mt-1"
              />
            </label>

            <label className="block mb-2 font-semibold">
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={onChange}
                className="textarea textarea-bordered w-full mt-1"
                rows="3"
              />
            </label>

            <label className="block mb-2 font-semibold">
              Images (comma separated URLs)
              <input
                type="text"
                name="images"
                value={formData.images}
                onChange={onChange}
                className="input input-bordered w-full mt-1"
              />
            </label>

            <label className="block mb-4 font-semibold">
              Location
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={onChange}
                className="input input-bordered w-full mt-1"
              />
            </label>

            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => setEditingCar(null)} className="btn btn-outline">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyCarsList;
