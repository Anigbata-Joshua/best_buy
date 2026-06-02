import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';

function Product_section() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const BASE_URL = "http://ecommerce.reworkstaging.name.ng/v2";
    const merchantId = localStorage.getItem("merchant_id");
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                // Use the endpoint from your documentation: /products/:product_id
                const response = await fetch(`${BASE_URL}/products/${id}`);

                if (!response.ok) {
                    throw new Error(`Product not found. Status: ${response.status}`);
                }

                const data = await response.json();

                //APIs can wrap data in a 'data' key or return the object directly
                setProduct(data.data || data);
                setLoading(false);
            } catch (error) {
                console.error("Fetch Error:", error);
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, merchantId]);

    const cleanPrice = (val) => {
        if (typeof val === "number") return val;
        return parseFloat(String(val || "0").replace(/[^\d.]/g, "")) || 0;
    };

    if (loading) return (
        <div className="py-20 text-center">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
            <p className="font-bold text-gray-500">Loading Product Details...</p>
        </div>
    );

    if (!product) return <div className="py-20 text-center font-bold text-red-500">Product not found.</div>;

    const numericPrice = cleanPrice(product.price);
    const mainImage = product.image || (product.images && product.images[0]);

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-8 font-sans text-gray-900">
                {/* Dynamic Breadcrumbs */}
                <nav className="text-xs text-blue-600 mb-6 flex gap-2">
                    <Link to="/" className="hover:underline">Best Buy</Link> <span>&gt;</span>
                    <span className="hover:underline cursor-pointer">{product.category_name || "Shop"}</span> <span>&gt;</span>
                    <span className="text-gray-500 line-clamp-1">{product.title || product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT: IMAGES */}
                    <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
                        <div className="flex flex-row md:flex-col gap-2 order-2 md:order-1">

                            {/* Logic to show gallery if images array exists, otherwise just show main thumb */}
                            {(product.images && product.images.length > 0 ? product.images : [mainImage]).map((img, i) => (
                                <div key={i} className="w-16 h-16 border rounded-md p-1 cursor-pointer hover:border-blue-500 bg-white">
                                    <img src={img} alt="thumb" className="object-contain w-full h-full" />
                                </div>
                            ))}
                        </div>
                        <div className="flex-1 order-1 md:order-2 relative bg-white border border-gray-100 rounded-sm p-2 flex items-center justify-center min-h-100">
                            <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">New</span>
                            <img src={mainImage} alt={product.title} className="w-full object-contain" />
                        </div>
                    </div>

                    {/* Right_content */}
                    <div className="lg:col-span-5">
                        <p className="text-blue-600 text-sm font-medium mb-1">{product.brand || "Brand Selection"}</p>
                        <h1 className="text-2xl font-semibold leading-tight mb-2">
                            {product.title || product.name}
                        </h1>
                        <p className="text-xs text-gray-500 mb-4">SKU: {product.id?.slice(-8) || "N/A"}</p>

                        <div className="flex items-center gap-1 mb-6">
                            <div className="flex text-yellow-500">★★★★★</div>
                            <span className="text-blue-600 text-xs font-bold">4.9 (1,240 reviews)</span>
                        </div>
                        <hr className="mb-6" />

                        <div className="mb-6">
                            <span className="text-3xl font-bold">₦ {Math.round(numericPrice * 0.91).toLocaleString()}</span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="bg-red-600 text-white text-[10px] font-bold px-1 py-0.5 rounded">Special Price</span>
                                <span className="text-gray-500 text-xs line-through">₦{(numericPrice).toLocaleString()}</span>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={() => {
                                    const cart = JSON.parse(localStorage.getItem("cart")) || [];
                                    const existing = cart.find(item => item.id === product.id);
                                    if (existing) {
                                        toast.error("Product already added to cart. You can increase quantity instead")
                                    } else {
                                        cart.push({ ...product, quantity: 1 });
                                        toast.success("Added to cart!");
                                    }
                                    localStorage.setItem("cart", JSON.stringify(cart));

                                }}
                                className="w-full bg-yellow-300 text-black py-3 cursor-pointer hover:bg-yellow-400 mb-2 rounded-sm font-bold">
                                Add to cart
                            </button>
                            <p className="text-[11px] text-center mt-2 text-blue-600 hover:underline cursor-pointer font-medium">Available for Shipping & Store Pickup</p>
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}
                <section className="mt-16 pt-8 border-t">
                    <h2 className="text-2xl font-bold mb-8">Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 border border-black rounded flex items-center justify-center text-lg">📦</div>
                            <div>
                                <p className="text-[11px] text-gray-500 uppercase font-bold">Category</p>
                                <p className="font-bold">{product.category?.name || "General"}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 border border-black rounded flex items-center justify-center text-lg">🛡️</div>
                            <div>
                                <p className="text-[11px] text-gray-500 uppercase font-bold">Warranty</p>
                                <p className="font-bold">1 Year Manufacturer</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 border border-black rounded flex items-center justify-center text-lg">🚚</div>
                            <div>
                                <p className="text-[11px] text-gray-500 uppercase font-bold">Shipping</p>
                                <p className="font-bold">Free Standard Shipping</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Product_section;