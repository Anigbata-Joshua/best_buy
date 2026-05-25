import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { LuPackagePlus } from "react-icons/lu";

function CreateProduct() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    // State for categories list
    const [categoriesList, setCategoriesList] = useState([]);//For all_categories
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    const [product, setProduct] = useState({
        title: "",
        descp: "",
        price: "",
        quantity: "",
        images: "",
        brand: ""
    });

    const base_url = "http://ecommerce.reworkstaging.name.ng/v2";

    useEffect(() => {
        //Check if merchant_info exists. Grab from localStorage
        const merchant_info = JSON.parse(localStorage.getItem("merchant_info"));

        const merchantId = merchant_info?.id;//optional chaining. Look for merhant_info, if it exist, grab the id

        if (!merchantId) {
            toast.error("Merchant not created or missing. Please login or register.");
            navigate("/admin/login");
            return;
        }

        // Load Categories for the Dropdown
        const storedCats = JSON.parse(localStorage.getItem("all_categories")) || []; // Get all_categories from localStorage
        setCategoriesList(storedCats);//set and update state

        //check if category exists
        if (storedCats.length == 0) { 
            toast.error("No categories found. Please create one first.");
            navigate("/create-category");
        }
    }, [ navigate]);// Stale closure:if you a verriable is been used inside an effect, it should be passed in the dependency array

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get Merchant Info from localStorage
        const merchant_info = JSON.parse(localStorage.getItem("merchant_info"));
        const merchant_id = merchant_info?.id;//optional chaining. Look for merhant_info, if it exist, grab the id

        // Validations
        const { title, descp, price, quantity, brand, images } = product;

        if (!title || !descp || !price || !quantity || !brand || !images || !selectedCategoryId) {
            toast.error("All field must be filled")
            return;
        }

        setLoading(true);

        //Api format
        const product_obj = {
            title,
            brand: product.brand || "Generic",
            images: [images],   // API expects array of strings
            price: Number(price),
            quantity: Number(quantity),
            currency: "NGN",
            descp,
            category_id: selectedCategoryId, // Using ID from dropdown
            merchant_id: merchant_id
        };

        try {
            const response = await axios.post(`${base_url}/products`, product_obj);
            toast.success("Product created successfully!");
            navigate('/admin/view-product' )
            console.log("Response:", response.data);

            // Reset form
            setProduct({
                title: "",
                descp: "",
                price: "",
                quantity: "",
                images: "",
                brand: "",
            });
            setSelectedCategoryId("");
            
        } catch (error) {
            toast.error(error.response?.data?.msg || "Failed to create product");
            console.error(error);
        } finally {
            setLoading(false);//Stops the page from reloading and keeps input even if code crashes
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-600 rounded-lg text-white">
                        <LuPackagePlus size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Add New Product</h2>
                        <p className="text-slate-500 text-sm">Fill in the details to list your product.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* --- CATEGORY */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Product Category</label>
                        <select
                            className="w-full border border-slate-300 rounded-sm p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
                            <option value="">-- Select a Category --</option>
                            {categoriesList.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* --- BASIC INFO --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Product Title</label>
                            <input name="title" type="text" placeholder="Enter product name" className="w-full border border-slate-300 rounded-lg p-2.5 outline-none"
                                value={product.title}
                                onChange={handleChange}/>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Brand Name</label>
                            <input name="brand" type="text" placeholder="e.g. Hp, Apple, Samsung" className="w-full border border-slate-300 rounded-sm p-2.5 outline-none"
                                value={product.brand}
                                onChange={handleChange}/>                               
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                        <textarea name="descp" rows="4" placeholder="Describe your product..." className="w-full border border-slate-300 rounded-sm p-2.5 outline-none"
                            value={product.descp}
                            onChange={handleChange}/>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Price (₦)</label>
                            <input name="price" type="number" placeholder="0.00" className="w-full border border-slate-300 rounded-sm p-2.5 outline-none" 
                                value={product.price}
                                onChange={handleChange}/>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Stock Quantity</label>
                            <input name="quantity" type="number" placeholder="Enter stock count" className="w-full border border-slate-300 rounded-sm p-2.5 outline-none"
                                value={product.quantity}
                                onChange={handleChange}/>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Main Image URL</label>
                        <input name="images" type="text" placeholder="https://example.com/image.jpg" className="w-full border border-slate-300 rounded-sm p-2.5 outline-none"
                            value={product.images}
                            onChange={handleChange}/> 
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-lg font-bold text-white transition-all ${
                            loading ? "bg-slate-400 cursor-not-allowed" : "bg-black cursor  cursor-pointer"
                        }`} >
                        {loading ? "Creating Product..." : "SUBMIT PRODUCT"}
                        
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;