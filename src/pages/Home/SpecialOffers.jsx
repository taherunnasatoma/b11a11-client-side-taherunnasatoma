import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const offers = [
  {
    id: 1,
    title: "Get 15% off for weekend rentals!",
    description: "Enjoy a special discount on all weekend bookings. Limited time offer!",
    buttonText: "Book Now",
  },
  {
    id: 2,
    title: "Luxury cars at $99/day this holiday season!",
    description: "Drive in style with our premium collection. Offer valid till end of the season.",
    buttonText: "Book Now",
  },
];

const SpecialOffers = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-[#65bbd6] to-[rgba(30,155,153,0.14)]  rounded-xl mt-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-10">Special Offers</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-black mb-4">{offer.title}</h3>
              <p className="text-black mb-6">{offer.description}</p>
             <Link to='/available_cars'><button className="bg-[#65bbd6] text-white px-6 py-2 rounded-full font-medium hover:bg-[#65bcd6c0] transition duration-300">
                {offer.buttonText}
              </button></Link> 
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
