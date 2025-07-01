import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log('signed out user');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li><NavLink to="/" className="text-lg font-semibold text-white">Home</NavLink></li>
      <li><NavLink to="/available_cars" className="text-lg font-semibold text-white">Available Cars</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/addCar" className="text-lg font-semibold text-white">Add Car</NavLink></li>
          <li><NavLink to="/myBookings" className="text-lg font-semibold text-white">My Bookings</NavLink></li>
          <li><NavLink to="/myCars" className="text-lg font-semibold text-white">My Cars</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-[#65bbd6] shadow-sm sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Logo and Hamburger */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-[#65bbd6] rounded-box w-52 space-y-2"
            >
              {links}
            </ul>
          </div>
          <NavLink to="/" className="btn btn-ghost normal-case text-xl font-bold text-white">
            🚗 <span className="ml-1"><span className='text-white text-2xl'>Dream</span>Ride Rentals</span>
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            {links}
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
            src={user?.photoURL || '/user.png'}
            alt="User"
          />
          {user ? (
            <button onClick={handleSignOut} className="btn btn-sm bg-white text-[#65bbd6] font-semibold">
              Sign Out
            </button>
          ) : (
            <>
              <NavLink className="btn btn-sm bg-white text-[#65bbd6] font-semibold" to="/register">Register</NavLink>
              <NavLink className="btn btn-sm bg-white text-[#65bbd6] font-semibold" to="/login">Login</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
