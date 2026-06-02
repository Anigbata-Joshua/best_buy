import React, { useEffect, useState } from "react";
import axios from "axios";
import { LuPencil, LuTrash2, LuPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DataContent } from "../../context/DataContext";


const BASE_URL = "http://ecommerce.reworkstaging.name.ng/v2";

function ViewProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const navigate = useNavigate();
    const { merchantId, loading: contextLoading } = React.useContext(DataContent); // Get merchantId from context

    useEffect(() => {
        if (contextLoading) return;
        if (!merchantId) {
            setProducts([]);
            setLoading(false);
            return;
        }

        const getAdminProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${BASE_URL}/products`, {
                    params: {
                        merchant_id: merchantId,
                        limit: 100
                    }
                });

                const productData = res.data.data || res.data;
                setProducts(productData);
            } catch (err) {
                console.error("Error fetching products", err);
            } finally {
                setLoading(false);
            }
        };
        getAdminProducts();
    }, [merchantId, contextLoading]); // Refetch products when merchantId becomes available


    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/products/${id}`);
            // Remove from UI immediately
            setProducts(products.filter(prodts => prodts.id !== id));
            toast.success("Product deleted successfully");
            setShowDelete(false);
        } catch (err) {
            toast.error("Failed to delete product, Try again after sometime");
        }
    };
 if (loading) {
        return (
            <div className="flex flex-col gap-4 justify-center items-center h-screen w-full bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                <p className="font-bold text-gray-500">Please wait, loading products...</p>
            </div>
        );
    }

    return (
        <div className=" min-h-screen p-6 md:p-10 relative">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Products Catalog</h1>
                        <p className="text-sm text-gray-500">Manage your store inventory</p>
                    </div>
                    <button onClick={() => navigate("/admin/create-products")} className="bg-[#0046BE] cursor-pointer text-white p-3 rounded md:px-6 md:py-3 md:rounded-xl flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all">
                        <LuPlus size={20} /> <span className="hidden md:inline">Add Product</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                                <div className="h-50">
                                    <img src={product.image} alt={product.title} className="w-full h-full object-cover py-4 " />
                                    <div className=" px-4 rounded-sm text-[14px] font-bold uppercase text-gray-600 mb-2">
                                        {product.category?.name || "General"}
                                    </div>
                                </div>

                                <div className="p-4 mt-3">
                                    <h3 className="font-semibold text-gray-800 truncate">{product.title}</h3>
                                    <p className="text-[#0046BE] font-bold mt-1">₦{(product.price).toLocaleString()}</p>

                                    <div className="flex items-center justify-between mt-4 pt-4">
                                        <button onClick={() => { setIdToDelete(product.id); setShowDelete(true); }} className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer">
                                            <LuTrash2 size={22} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
                            <p className="text-gray-400">No products found. Start by adding one!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* DELETE MODAL */}
            {showDelete && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-sm w-full text-center">
                        <h3 className="text-lg font-bold text-gray-900">Delete Item?</h3>
                        <p className="text-sm text-gray-500 mt-2">Are you sure? This action cannot be undone.</p>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowDelete(false)} className="flex-1 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-xl border border-gray-200 transition cursor-pointer">
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(idToDelete)} className="flex-1 py-2 bg-red-600 text-white font-medium hover:bg-red-700 rounded-xl transition cursor-pointer">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewProduct;