import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';


const axiosInstance=axios.create({
    baseURL:'http://localhost:3000'
})

const useAxiosToken = () => {
  const{user,signOutUser} = use(AuthContext);
  axiosInstance.interceptors.request.use(config=>{
     config.headers.authorization=`Bearer ${user.accessToken}`
    return config;
  })

  //response interceptor

  axiosInstance.interceptors.response.use(response=>{
    return response;
  },
  error=>{
    console.log(error)
  if(error.status===401 ||error.status===403){
    signOutUser()
    .then(()=>{
        console.log('signout user for 401 status code')
    })
    .catch(err=>{
        console.log(err)
    })
  }
    return Promise.reject(error)
  }

)



    return axiosInstance;
};

export default useAxiosToken;