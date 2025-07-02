import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router'; // Make sure it's react-router-dom here
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [showSignOut, setShowSignOut] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log('signed out user');
        setShowSignOut(false);
      })
      .catch(error => {
        console.log(error);
      });
  };


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSignOut(false);
      }
    }
    if (showSignOut) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSignOut]);

  const baseLinks = (
    <>
      <li><NavLink to="/" className="text-lg font-semibold text-white">Home</NavLink></li>
      <li><NavLink to="/available_cars" className="text-lg font-semibold text-white">Available Cars</NavLink></li>
    </>
  );

  
  const userLinks = (
    <>
      <li><NavLink to="/addCar" className="text-lg font-semibold text-white">Add Car</NavLink></li>
      <li><NavLink to="/myBookings" className="text-lg font-semibold text-white">My Bookings</NavLink></li>
      <li><NavLink to="/myCars" className="text-lg font-semibold text-white">My Cars</NavLink></li>
    </>
  );

 
  const authLinksMobile = (
    <>
      <li><NavLink to="/register" className="text-lg font-semibold text-white">Register</NavLink></li>
      <li><NavLink to="/login" className="text-lg font-semibold text-white">Login</NavLink></li>
    </>
  );

  return (
    <div className="bg-[#65bbd6] shadow-sm sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
       
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
              {baseLinks}
              {user ? userLinks : authLinksMobile}
            </ul>
          </div>
          <NavLink to="/" className="btn btn-ghost normal-case text-xl font-bold text-white">
            🚗 <span className="ml-1"><span className='text-white text-2xl'>Dream</span><span className='text-black'>Ride</span></span>
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            {baseLinks}
            {user && userLinks}
          </ul>
        </div>

        <div className="navbar-end relative flex items-center gap-3 pr-2">
          {user ? (
            <>
              <img
                onClick={() => setShowSignOut(!showSignOut)}
                className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer"
                src={user.photoURL || '/user.png'}
                alt="User"
              />
              {showSignOut && (
                <div
                  ref={dropdownRef}
                  className="
                    absolute
                    right-0
                    mt-12

                    -mb-10
                    bg-white
                    rounded
                    shadow-lg
                    py-2
                    w-32
                    max-w-full
                    text-center
                    z-50
                  "
                >
                  <button
                    onClick={handleSignOut}
                    className="btn btn-sm py-4 bg-[#65bbd6] text-white font-semibold w-full"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </>
          ) : (
            
            <div className="hidden lg:flex gap-2">
              <NavLink className="btn btn-sm bg-white text-[#65bbd6] font-semibold" to="/register">Register</NavLink>
              <NavLink className="btn btn-sm bg-white text-[#65bbd6] font-semibold" to="/login">Login</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
