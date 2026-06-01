import React, { useEffect, useState } from "react";
import axios from "axios";
import { LuPackage, LuUsers, LuShoppingCart, LuPlus, LuTrash2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import HeroProps from "../../components/ShopComponents/HeroProps";
import { DataContent } from "../../context/DataContext";

const BASE_URL = "http://ecommerce.reworkstaging.name.ng/v2";

function MerchantDashboard() {
    const [products, setProducts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const { merchantId } = React.useContext(DataContent); // Get merchantId from context

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
          

            try {
                if (merchantId) {
                    const prodRes = await axios.get(`${BASE_URL}/products?merchant_id=${merchantId}`, {
                        params: {
                            merchantId,
                            limit: 100 // Increased limit from 10 - 100
                        }
                    });
                    setProducts(prodRes.data.data || prodRes.data || []);
                }

                const userRes = await axios.get(`${BASE_URL}/users`);
                setTotalUsers(userRes.data.length || 0);

                const cartData = JSON.parse(localStorage.getItem("cart")) || [];

                // Just get the length of the array
                const count = cartData.length;

                setCartCount(count);

            } catch (err) {
                console.error("Dashboard data fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleDelete = async (productId) => {
        try {
            await axios.delete(`${BASE_URL}/products/${productId}`);
            setProducts((prev) => prev.filter((p) => p.id !== productId));
            toast.success("Product deleted successfully");
        } catch (err) {
            console.error("Error deleting product:", err);
            toast.error("Failed to delete product");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="font-bold text-gray-500">Loading Dashboard Details...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-black">Merchant Dashboard</h1>
                    <Link
                        to="/admin/create-products"
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-sm text-sm font-semibold">
                        <LuPlus size={18} /> Add Product
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard title="Total Products" value={products.length} Icon={LuPackage} color="text-blue-600" bgColor="bg-blue-100" />
                    <Link to="/admin/users">
                        <StatCard title="Registered Users" value={totalUsers} Icon={LuUsers} color="text-green-600" bgColor="bg-green-100" />
                    </Link>
                    <Link to="/cart"><StatCard title="Cart Items" value={cartCount} Icon={LuShoppingCart} color="text-orange-600" bgColor="bg-orange-100" /></Link>
                </div>

                {/* Inventory Table */}
                <div className="bg-white rounded-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center gap-2">
                        <h3 className="font-bold text-gray-800 uppercase tracking-widest text-sm">Product Inventory</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                                <tr>
                                    <th className="p-4">Product</th>
                                    <th className="p-4 text-center">Image</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <tr key={product.id} className="border-b border-gray-50">
                                            <td className="p-4 text-sm font-medium text-gray-700">
                                                <Link to="/shop" className="text-blue-600 hover:underline">
                                                    {product.title}
                                                </Link>
                                            </td>
                                            <td className="p-4">
                                                <img src={product.image || "https://placehold.co/100x100"} alt={product.title}
                                                    className="h-10 w-10 object-cover mx-auto rounded shadow-sm border border-gray-100"
                                                />
                                            </td>
                                            <td className="p-4 font-bold text-gray-900">
                                                ₦{product.price}
                                            </td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase">
                                                    {product.category?.name || "Uncategorized"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                       
                                                <button
                                                    onClick={() => { setItemToDelete(product.id); setShowDelete(true); }}
                                                    className="text-red-600 cursor-pointer flex items-center gap-1 mx-auto hover:underline"
                                                >
                                                    <LuTrash2 size={16} /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-10 text-center text-gray-400">No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showDelete && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xs w-full text-center">
                        <p className="font-bold text-gray-800">Delete this product?</p>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => setShowDelete(false)} className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-sm cursor-pointer">
                                Cancel
                            </button>
                            <button onClick={() => { handleDelete(itemToDelete); setShowDelete(false); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium cursor-pointer">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// StatCard component
function StatCard({ title, value, Icon, color, bgColor }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl ${bgColor} ${color}`}>
                <Icon />
            </div>
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>
                <h2 className="text-3xl font-extrabold text-gray-900">{value}</h2>
            </div>
        </div>
    );
}

export default MerchantDashboard;
