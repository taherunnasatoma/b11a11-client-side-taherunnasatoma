import React, { use, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const Register = () => {

    const {createUser}=use(AuthContext)

    const [error, setError] = useState('');

    const handleRegister = e=>{
        e.preventDefault()
        const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        'Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.'
      );
      return;
    }
     console.log({ name, photoURL, email, password });
    
     //create user
     createUser(email,password)
     .then(result=>{
        console.log(result.user)
     })

     .catch(error=>{
        console.log(error)
     })



       
    }
   


    
    return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100">
        
      <div className="card bg-base-100 py-5 w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className="font-bold text-2xl text-center">Register your account</h2>

        <div className="card-body">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="label">Name</label>
              <input name="name" type="text" className="input input-bordered w-full" placeholder="Name" required />
            </div>

            <div>
              <label className="label">Photo URL</label>
              <input name="photoURL" type="text" className="input input-bordered w-full" placeholder="Photo URL" />
            </div>

            <div>
              <label className="label">Email</label>
              <input name="email" type="email" className="input input-bordered w-full" placeholder="Email" required />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="Password"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="btn bg-[#05e9b4] text-white  w-full">Register</button>

            <p className="text-center mt-4">
              Already have an account?{' '}
              <Link className="text-red-500 font-medium" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    );
};

export default Register;