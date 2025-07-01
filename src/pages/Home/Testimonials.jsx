import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah H.",
      image: "https://i.ibb.co/HmQ3Z9h/5.jpg",
      comment: "DreamRide Rentals made my weekend trip super smooth! The booking was easy, and the car was spotless.",
      rating: 5
    },
    {
      name: "Ali M.",
      image: "https://i.ibb.co/SwQT6x62/1.jpg",
      comment: "I booked a luxury car at a great price. The team was very responsive and helpful. Highly recommend!",
      rating: 4
    },
    {
      name: "Priya S.",
      image: "https://i.ibb.co/DP8FHZ6r/10.jpg",
      comment: "Loved the entire experience. Easy to navigate website and excellent support.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#65bbd6] to-[rgba(30,155,153,0.14)] rounded-xl px-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-white">What Our Customers Say</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 mx-auto rounded-full mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{t.name}</h4>
              <p className="text-gray-600 text-sm mb-4">"{t.comment}"</p>
              <div className="flex justify-center text-yellow-400">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
