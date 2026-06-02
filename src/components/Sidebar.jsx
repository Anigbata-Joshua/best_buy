import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LuLayoutDashboard,
    LuLayers,
    LuPackage,
    LuUsers,
    LuPlus,
    LuUserPlus,
} from "react-icons/lu";
import toast from 'react-hot-toast';

const navItems = [
    { label: 'Dashboard', icon: <LuLayoutDashboard />, path: '/admin' },
    { label: 'Create Category', icon: <LuLayers />, path: '/admin/create-category' },
    { label: 'Products', icon: <LuPackage />, path: '/admin/view-product' },
    { label: 'Users', icon: <LuUsers />, path: '/admin/users' },
    { label: 'Create Product', icon: <LuPlus />, path: '/admin/create-products' },
    { label: 'Create User', icon: <LuUserPlus />, path: '/admin/create-user' },
];

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    const handleLogout = () => {
        // Close modal and start loading animation
        setShowLogout(false);
        setLoading(true);

        // Clear your auth data
        localStorage.removeItem("merchant_info");
        toast.success("Logged out successfully");

        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-4 justify-center items-center h-screen w-full bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                <p className="font-bold text-gray-500">Please wait, logging out...</p>
            </div>
        );
    }

    return (
        <aside className="w-64 bg-blue-950 text-[#dedede] flex flex-col h-screen sticky top-0 shrink-0">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">Admin.</div>

            <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${location.pathname === item.path
                            ? 'bg-blue-900 text-white shadow-inner'
                            : 'hover:bg-blue-900/50 hover:text-gray-100'
                            }`}>
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4">
                {showLogout ? (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xs w-full text-center">
                            <p className="font-bold text-gray-800 text-base">
                                Are you sure you want to logout?
                            </p>
                            <div className="flex gap-3 mt-5">
                                <button onClick={() => setShowLogout(false)}
                                    className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowLogout(true)}
                        className="w-full py-2.5 rounded bg-red-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition cursor-pointer"
                    >
                        Logout
                    </button>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;