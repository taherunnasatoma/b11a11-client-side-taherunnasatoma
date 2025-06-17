import React, { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddCar = () => {

    const { user } = use(AuthContext)

    const handleAddCar = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries());

        // Add default values
        const newCar = {
            ...data,
            features: data.features?.split(',').map(f => f.trim()) || [],
            bookingCount: 0,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        console.log('Submitting:', newCar);

        axios.post('http://localhost:3000/cars', newCar)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your car has been added",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    return (
        <div>
            <div className="bg-gray-100 py-10 min-h-screen">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Add New Car</h2>

                    <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="label">Car Model</label>
                            <input name="carModel" className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label">Daily Rental Price (USD)</label>
                            <input name="price" type="number" className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label">Availability</label>
                            <select name="availability" className="select select-bordered w-full" required>
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </div>

                        <div>
                            <label className="label">Vehicle Registration Number</label>
                            <input name="registrationNumber" className="input input-bordered w-full" required />
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">Features (comma separated)</label>
                            <input name="features" className="input input-bordered w-full" placeholder="GPS, AC, Bluetooth" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">Description</label>
                            <textarea name="description" rows="4" className="textarea textarea-bordered w-full" />
                        </div>

                        <div>
                            <label className="label">Image URL</label>
                            <input name="imageUrl" className="input input-bordered w-full" required />
                        </div>

                        <div>
                            <label className="label">Location</label>
                            <input name="location" className="input input-bordered w-full" required />
                        </div>


                        <div className="md:col-span-2">
                            <label className="label">User Email</label>
                            <input
                                name="email"
                                defaultValue={user?.email || ''}
                                className="input input-bordered w-full"
                            />

                        </div>

                        <div className="md:col-span-2 flex justify-between items-center mt-4">
                            <button className="btn bg-[#05e9b4] hover:bg-[#04c79a] text-white w-full">Add Car</button>
                            {/* {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-600">{success}</p>} */}
                        </div>
                    </form>
                </div>
            </div>


        </div>
    );
};

export default AddCar; 