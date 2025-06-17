import React, { Suspense, use } from 'react';
import BookingList from './BookingList';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { myBookingsPromise } from '../../api/bookingApi';



const MyBookings = () => {

    const {user} = use(AuthContext)
    return (
        <div>
           <Suspense fallback={'loading bookingss'}>
            <BookingList
            myBookingsPromise={myBookingsPromise(user.email)}
            ></BookingList>
            </Suspense> 
        </div>
    );
};

export default MyBookings;