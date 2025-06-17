import React, { Suspense, use } from 'react';
import BookingList from './BookingList';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import useApplicationApi from '../../api/useApplicationApi';





const MyBookings = () => {
    const { myBookingsPromise}= useApplicationApi();

    const {user} = use(AuthContext)

   
    return (
        <div>
           <Suspense fallback={'loading bookingss'}>
            <BookingList
            myBookingsPromise={myBookingsPromise}
            ></BookingList>
            </Suspense> 
        </div>
    );
};

export default MyBookings;