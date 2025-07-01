import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer';
import Navbar from '../pages/Shared/Navbar';

const RootLayout = () => {
    return (
         <div className="min-h-screen flex flex-col">
            <Navbar />
            
            
            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default RootLayout;