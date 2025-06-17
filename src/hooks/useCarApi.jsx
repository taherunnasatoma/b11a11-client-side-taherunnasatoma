import React from 'react';
import useAxiosToken from './useAxiosToken';

const useCarApi = () => {
  const axiosSecure = useAxiosToken()

    const carsCreatedByPromise=email=>{
        return axiosSecure.get(`/cars?email=${email}`)
        .then(res=>res.data)
    }
    return{
        carsCreatedByPromise
    }
    
};

export default useCarApi;