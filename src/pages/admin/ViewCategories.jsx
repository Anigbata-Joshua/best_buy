import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { LuPlus, LuFolder, LuTrash2, LuLayoutGrid } from "react-icons/lu";
import Swal from 'sweetalert2';

function ViewCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { merchantId } = React.useContext(DataContent); // Get merchantId from context

    const BASE_URL = "http://ecommerce.reworkstaging.name.ng/v2";
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const merchantId = localStorage.getItem("merchant_id");

        if (!merchantId) {
            toast.error("Session expired. Please login.");
            navigate("/login");
            return;
        }

        try {
            // GET request for the merchant
            const response = await axios.get(`${BASE_URL}/categories?merchant_id=${merchantId}`);

            // Api response
            const data = response.data.data || response.data;
            setCategories(data);
        } catch (err) {
            console.error("Fetch error:", err);
            toast.error("Failed to load categories.");
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?"))
            return;

        try {
            await axios.delete(`${BASE_URL}/categories/${id}`);
            toast.success("Category deleted");
            
            // Refresh the list
            setCategories(categories.filter(cat => cat.id !== id));
        } catch (err) {
            toast.error("Could not delete category.");
        }
    };


    // const deleteCategory = async (id) => {
    //     const result = await Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#2563eb", // Tailwind blue-600
    //         cancelButtonColor: "#ef4444",  // Tailwind red-500
    //         confirmButtonText: "Yes, delete it!"
    //     });

    //     if (result.isConfirmed) {
    //         try {
    //             await axios.delete(`${BASE_URL}/categories/${id}`);
    //             Swal.fire("Deleted!", "Your category has been removed.", "success");
    //             setCategories(categories.filter(cat => cat.id !== id));
    //         } catch (err) {
    //             Swal.fire("Error!", "Could not delete category.", "error");
    //         }
    //     }
    // };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            <Toaster position="top-right" />

            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                            <LuLayoutGrid className="text-blue-600" />
                            Product Categories
                        </h1>
                        <p className="text-slate-500 mt-1">Manage the collections in your store.</p>
                    </div>

                    <Link
                        to="/admin/create-category"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 cursor-pointer text-white font-bold py-3 px-6 rounded-sm"
                    >
                        <LuPlus size={20} />
                        Add New Category
                    </Link>
                </div>

                {/* Content Section */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="animate-spin rounded-sm h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-slate-500 font-medium">Loading your collections...</p>
                    </div>
                ) : categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <div key={category.id} className="bg-white rounded-sm border border-slate-100 p-5 group">
                                <div className="w-full h-32 bg-slate-100 rounded-sm mb-4 overflow-hidden flex items-center justify-center">
                                    {category.image ? (
                                        <img src={category.image} alt={category.name} className="w-full h-full object-cover cursor-pointer" />
                                    ) : (
                                        <LuFolder className="text-slate-300 w-12 h-12" />
                                    )}
                                </div>
                                {/* delete section */}
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-slate-700 text-lg truncate">{category.name}</h3>
                                    <button onClick={() => deleteCategory(category.id)} className="p-2 text-red-500 cursor-pointer" title="Delete Category">
                                        <LuTrash2 className='text-xl' />
                                    </button>
                                </div>
                                {/* <p className="text-slate-400 text-xs mt-1">ID: {category.id.substring(0, 8)}...</p> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LuFolder className="text-slate-300 w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">No categories found</h3>
                        <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                            Creating your first category. It only takes a minute.
                        </p>
                        <Link
                            to="/create-category"
                            className="mt-6 inline-block text-blue-600 font-bold hover:text-blue-700 underline underline-offset-4"
                        >
                            Create your first category now
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewCategory;