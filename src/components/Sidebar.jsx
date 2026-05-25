import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LuLayoutDashboard,
    LuLayers,
    LuPackage,
    LuUsers,
    LuPlus,
    LuUserPlus,
} from "react-icons/lu";

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

    return (
        <aside className="w-64 bg-blue-950 text-[#dedede] flex flex-col h-screen sticky top-0 shrink-0">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">Admin.</div>

            <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
                {navItems.map((item) => (
                    <Link key={item.label} to={item.path} className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-blue-900 text-white shadow-inner' 
                        : 'hover:bg-blue-900/50 hover:text-gray-100'
                        }`}>
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-700">
            <Link to="/admin/login">
                <button className="w-full py-2.5 rounded bg-red-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition cursor-pointer">
                    Logout
                </button>
            </Link>
            </div>
        </aside>
    );
};

export default Sidebar;