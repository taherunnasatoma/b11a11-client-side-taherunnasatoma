import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#65bbd6] text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        
        <div className="flex flex-col items-start space-y-3">
          <div className="flex items-center space-x-2  text-2xl font-bold">
            <span>🚗</span>
            <h2 className='text-white'>Dream<span className='text-black'>Ride</span></h2>
          </div>
          <p className="text-white text-sm">
            Your next adventure starts here. Affordable. Reliable. Stylish.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="text-white text-lg font-semibold">Quick Links</h3>
          <a href="/" >Home</a>
          <a href="/available_cars" >Available Cars</a>
          <a href="/login" >Login</a>
          <a href="/register">Register</a>
        </div>

       
        <div className="flex flex-col space-y-3">
          <h3 className="text-white text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" ><FaFacebook /></a>
            <a href="#" ><FaTwitter /></a>
            <a href="#" ><FaInstagram /></a>
            <a href="#" ><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white mt-8 pt-6 text-center text-white text-sm">
        © {new Date().getFullYear()} DreamRide Rentals. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
