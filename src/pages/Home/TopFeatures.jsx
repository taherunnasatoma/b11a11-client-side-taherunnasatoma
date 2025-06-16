import React from 'react';
import { motion } from 'framer-motion';
import { FaTruckMoving, FaBolt, FaShieldAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaTruckMoving />,
    title: 'Free Car Delivery',
    desc: 'We deliver your selected vehicle right to your doorstep at no extra cost.',
  },
  {
    icon: <FaBolt />,
    title: 'Instant Booking',
    desc: 'Book your ride in seconds and get confirmation instantly with zero hassle.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Verified Listings',
    desc: 'All cars are quality checked and verified for safety and reliability.',
  },
];

const TopFeatures = () => {
  return (
    <section className="py-16 px-6 bg-gray-100 mt-8 rounded-xl shadow">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">What Sets Us Apart</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-[#f9f9f9] p-8 rounded-xl text-center shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="text-5xl text-[#05e9b4] mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFeatures;
