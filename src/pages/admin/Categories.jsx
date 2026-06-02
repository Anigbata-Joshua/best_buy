import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { BiSolidCategoryAlt } from "react-icons/bi";
import { RiEdit2Fill } from "react-icons/ri";

const BASE_URL = "http://ecommerce.reworkstaging.name.ng/v2";

const CreateCategory = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [editCategoryId, setEditCategoryId] = useState(null);

    // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
        const merchant_info = JSON.parse(localStorage.getItem("merchant_info"));
        
        if (!merchant_info?.id) { 
            toast.error("No Merchant info found");
            navigate("/admin/login");
            return; 
        }

        try {
            const resp = await axios.get(`${BASE_URL}/categories?merchant_id=${merchant_info.id}`);
            setCategories(resp.data);

            // Sync storage with the latest data from API on load
            localStorage.setItem("all_categories", JSON.stringify(resp.data));
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch categories");
        }
    };
    fetchCategories();
}, []);

const handleCreateOrUpdateCategory = async (e) => {
    e.preventDefault();
    if (!name || !image) {
        toast.error("Name and image field cannot be empty");
        return;
    }

    setLoading(true);//Don't reloads the page
    try {
        const merchant_info = JSON.parse(localStorage.getItem("merchant_info"));
        if (!merchant_info?.id) {
            toast.error("Merchant not logged in");
            return;
        }

        let updatedCategory;

        if (editCategoryId) {
            // --- UPDATE API CALL ---
            const resp = await axios.put(`${BASE_URL}/categories/${editCategoryId}`, {
                name,
                image,
            });
            updatedCategory = resp.data;
            toast.success("Category updated successfully");

            // Update State
            setCategories((prev) =>
                prev.map((cat) => (cat.id === editCategoryId ? updatedCategory : cat))
            );
        } else {
            // --- CREATE API CALL ---
            const resp = await axios.post(`${BASE_URL}/categories`, {
                merchant_id: merchant_info.id,
                name,
                image,
            });
            updatedCategory = resp.data;
            toast.success("Category created successfully");

            // Update State and pass the data to the data already existing
            setCategories((prev) => [...prev, updatedCategory]);
        }

        //Get existing categories from storage
        const existingStored = JSON.parse(localStorage.getItem("all_categories")) || [];
        
        let newList;
        if (editCategoryId) {
            // Replace the updated item in the storage list
            newList = existingStored.map(cat => cat.id === editCategoryId ? updatedCategory : cat);
        } else {
            //Using spread operator to add to existing list of categories
            newList = [...existingStored, updatedCategory];
        }

        //Save the WHOLE array back to storage
        localStorage.setItem("all_categories", JSON.stringify(newList));
        
        //Clear inputs
        setName("");
        setImage("");
        setEditCategoryId(null);

    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.msg || "Operation failed");
    } finally {
        setLoading(false);
    }
};

    const handleEdit = (category) => {
        setName(category.name);
        setImage(category.image);
        setEditCategoryId(category.id);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Better UX
    };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
        await axios.delete(`${BASE_URL}/categories/${id}`);
        toast.success("Category deleted successfully");
        
        // 1. Update State
        setCategories((prev) => prev.filter((cat) => cat.id !== id));

        // 2. Update LocalStorage so they match!
        const existingStored = JSON.parse(localStorage.getItem("all_categories")) || [];
        const filteredList = existingStored.filter((cat) => cat.id !== id);
        localStorage.setItem("all_categories", JSON.stringify(filteredList));

    } catch (error) {
        console.error(error);
        toast.error("Failed to delete category");
    }
};

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto space-y-8">

                {/* FORM CARD */}
                <div className="bg-white p-8 rounded-sm  border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex gap-1"><BiSolidCategoryAlt  size ={40}/>
                        {editCategoryId ? "Edit Category" : "Add New Category"}
                    </h2>

                    <form onSubmit={handleCreateOrUpdateCategory} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Name</label>
                                <input type="text" placeholder="Category Name" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Image URL</label>
                                <input type="text" placeholder="https://..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm outline-none"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}/>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button type="submit" disabled={loading} className="flex-1 bg-black text-white font-bold py-3 cursor-pointer rounded-xl disabled:opacity-50">
                                {/* tinary operators */}
                                {loading ? "Saving..." : editCategoryId ? "Update Category" : "Create Category"}
                            </button>

                            {editCategoryId && (
                                <button type="button" onClick={() => { setEditCategoryId(null); setName(""); setImage(""); }} className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* LIST CARD */}
                <div className="bg-white rounded-sm border border-gray-100 overflow-hidden">
                    <div className="px-8 py-5 border-b border-gray-50">
                        <h3 className="text-xl font-bold text-gray-800">Existing Categories</h3>
                    </div>
                    <ul className="divide-y divide-gray-100">
                        {categories.length > 0 ? categories.map((cat) => (
                            <li key={cat.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <img src={cat.image || ""} alt={cat.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100"/>
                                    <span className="font-semibold text-gray-700">{cat.name}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEdit(cat)} className="p-2 text-blue-600  rounded-sm flex gap-1  text-[14px]">
                                        <RiEdit2Fill size={18} />Edit
                                    </button>
                                    <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        )) : (
                            <li className="p-8 text-center text-gray-400">No categories found</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;