import React, { Suspense, use } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import MyCarsList from './MyCarsList';
import useCarApi from '../../hooks/useCarApi';


const MyAddedCar = () => {


    const {user}= use(AuthContext)
    const{carsCreatedByPromise} =useCarApi()
    return (
        <div>
            <Suspense fallback={<span className="loading loading-bars loading-xl"></span>}>
                <MyCarsList carsCreatedByPromise={carsCreatedByPromise(user.email,user.accessToken)}></MyCarsList>
            </Suspense>
        </div>
    );
};

export default MyAddedCar;