import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0b0c2a] text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        
        <div className="flex flex-col items-start space-y-3">
          <div className="flex items-center space-x-2 text-[#05e9b4] text-2xl font-bold">
            <span>🚗</span>
            <h2>DreamRide Rentals</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Your next adventure starts here. Affordable. Reliable. Stylish.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="text-[#05e9b4] text-lg font-semibold">Quick Links</h3>
          <a href="/" className="hover:text-[#05e9b4] transition">Home</a>
          <a href="/cars" className="hover:text-[#05e9b4] transition">Available Cars</a>
          <a href="/login" className="hover:text-[#05e9b4] transition">Login</a>
          <a href="/register" className="hover:text-[#05e9b4] transition">Register</a>
        </div>

       
        <div className="flex flex-col space-y-3">
          <h3 className="text-[#05e9b4] text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-[#05e9b4]"><FaFacebook /></a>
            <a href="#" className="hover:text-[#05e9b4]"><FaTwitter /></a>
            <a href="#" className="hover:text-[#05e9b4]"><FaInstagram /></a>
            <a href="#" className="hover:text-[#05e9b4]"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} DreamRide Rentals. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
