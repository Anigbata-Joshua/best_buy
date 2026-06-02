import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const base_url = "http://ecommerce.reworkstaging.name.ng/v2";
    const merchantId = localStorage.getItem("merchant_id");
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${base_url}/users`, {
                params: { merchant_id: merchantId }
            });
            // Handle different API response structures
            const usersList = Array.isArray(response.data) ? response.data : (response.data.data || []);
            setUsers(usersList);
        } catch (err) {
            console.error("Fetch error:", err);
            setMessage("Failed to load users. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to remove this user?")) {
            try {
                // Actual DELETE request to the backend
                await axios.delete(`${base_url}/users/${id}`);

                alert("User removed successfully");
                setUsers(users.filter(user => user.id !== id));
            } catch (err) {
                console.error("Delete error:", err);
                alert(err.response?.data?.msg || "Failed to delete user. They might have active orders.");
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-2">Management</span>
                    <h2 className="text-3xl font-light text-gray-800 tracking-tight">Registered <span className="font-semibold text-blue-950">Users</span></h2>
                </div>
                <Link to="/admin/create-user"
                    className="px-8 py-3 bg-blue-950 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all shadow-xl shadow-blue-100 text-center">
                    Add New User
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">User Name</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone</th>
                                <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center">
                                        <div className="flex flex-col gap-4 justify-center items-center  w-full bg-gray-50">
                                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                                            <p className="font-bold text-gray-500">Loading Users...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-16 text-center text-gray-400 italic">No users found for this merchant.</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-5 font-bold text-gray-800 text-xs uppercase tracking-wider">
                                            {user.first_name} {user.last_name}
                                        </td>
                                        <td className="px-6 py-5 text-blue-600 text-xs lowercase">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-5 text-gray-500 text-xs font-mono">
                                            {user.phone || 'N/A'}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="text-[10px] font-bold text-red-400 uppercase tracking-widest"
                                            >
                                                delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {message && (
                <div className="mt-8 bg-red-50 border border-red-100 p-4 rounded-xl text-center text-[10px] text-red-500 font-bold uppercase">
                    ⚠️ {message}
                </div>
            )}
        </div>
    );
};

export default AdminUserList;