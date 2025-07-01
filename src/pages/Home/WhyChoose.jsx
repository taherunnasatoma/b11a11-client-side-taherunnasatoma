import React from 'react';
import { FaCarSide, FaMoneyBillWave, FaHeadset, FaRegCheckCircle } from 'react-icons/fa';

const WhyChoose = () => {
    return (
        <section className="py-16 rounded-xl mt-8 px-6 bg-gradient-to-br from-[#65bbd6] to-[rgba(30,155,153,0.14)]">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-10 text-white">Why Choose Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                        <div className="flex justify-center items-center text-5xl text-[#65bbd6] mb-4">
                            <FaCarSide />
                        </div>
                        <h3 className="text-xl font-semibold text-black  mb-2">Wide Variety of Cars</h3>
                        <p className="text-black text-sm">
                            From budget-friendly options to luxury rides — we’ve got every kind of car.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                        <div className=" flex justify-center items-center text-5xl text-[#65bbd6] mb-4 mx-auto">
                            <FaMoneyBillWave />
                        </div>
                        <h3 className="text-xl font-semibold text-black mb-2">Affordable Prices</h3>
                        <p className="text-black text-sm">
                            Competitive daily rates that fit your budget with no hidden charges.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                        <div className="flex justify-center items-center  text-5xl text-[#65bbd6] mb-4 mx-auto">
                            <FaRegCheckCircle />
                        </div>
                        <h3 className="text-xl font-semibold text-black  mb-2">Easy Booking</h3>
                        <p className="text-black text-sm">
                            Book your car in just a few clicks — simple, fast, and secure.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                        <div className=" flex justify-center items-center text-5xl text-[#65bbd6] mb-4 mx-auto">
                            <FaHeadset />
                        </div>
                        <h3 className="text-xl font-semibold text-black mb-2">24/7 Support</h3>
                        <p className="text-black text-sm">
                            Need help? Our support team is always here for you — day or night.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
