import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const Navbar = () => {

    const {user,signOutUser} =use(AuthContext)

    const handleSignOut=()=>{
        signOutUser()
        .then(()=>{
            console.log('signed out user')  
              })
              .catch(error=>{
                console.log(error)
              })
    }

    const links = <>
     <li className='text-xl font-bold'><NavLink to='/'>Home</NavLink></li>
     <li className='text-xl font-bold' ><NavLink to='/available_cars'>Available Cars</NavLink></li>
     
     {
      user && <>

      
     <li className='text-xl font-bold'><NavLink to='/addCar'>Add Car</NavLink></li>
      </>
    }
    </>

   
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
       {
        links
       }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl font-bold"><span>🚗</span>
            <h2><span className='text-[#05e9b4] text-2xl'>Dream</span>Ride Rentals</h2></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {
        links
      }
    </ul>
  </div>
  <div className="navbar-end gap-3">
     <img className="w-12 rounded-full" src={user?.photoURL || '/user.png'} alt="User" />
   {
    user ? <button onClick={handleSignOut} className='btn bg-[#05e9b4] text-white'> Sign Out</button> :
    <>
    <NavLink className='btn bg-[#05e9b4] text-white' to='/register'> Register</NavLink>
   <NavLink className='btn bg-[#05e9b4] text-white' to='/login'> Login</NavLink>
    </>
   }
  </div>
</div>
    );
};

export default Navbar;