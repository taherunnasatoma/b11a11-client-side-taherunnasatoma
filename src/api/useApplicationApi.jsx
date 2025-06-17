import React from 'react';
import useAxiosToken from '../hooks/useAxiosToken';

const useApplicationApi = () => {

    const axiosSecure = useAxiosToken()

    const myBookingsPromise=email=>{
        return axiosSecure.get(`/bookings?email=${email}`)
        .then(res=>res.data)
    }
    return{
        myBookingsPromise
    }
};

export default useApplicationApi;