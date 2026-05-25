import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FaUser } from "react-icons/fa";

const AdminLayout = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    //Get the merchant data from storage
    const storedMerchant = localStorage.getItem("merchant_info"); 

    if (storedMerchant) {
      try {
        const merchant = JSON.parse(storedMerchant);
        setAdminName(merchant.first_name || "Admin");
      } catch (err) {
        console.error("Error parsing merchant data", err);
      }
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto bg-gray-100">
        <header className="flex justify-between items-center p-5 bg-white border-b border-gray-100 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-sm border border-gray-200">
            <p className="text-[10px] font-blond text-black uppercase tracking-wider">Welcome</p>
            <p className="text-xs font-semibold text-gray-800 uppercase ">{adminName}</p>
            <span>
              <FaUser />
            </span>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;