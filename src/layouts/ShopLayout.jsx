import React from 'react';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Outlet } from 'react-router-dom';


function ShopLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-white">

            <main className="grow">
                <Nav />
                <Outlet />
                <Footer />
            </main>
        </div>
    );
};

export default ShopLayout;