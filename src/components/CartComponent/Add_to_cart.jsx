import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiAdguard } from "react-icons/si";
import visa from "../../assets/images/Homepage_img/visa.jpg"

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const formatPrice = (price) => {
        if (typeof price === "number")
            return price;
        const cleanedPrice = price.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except decimal point
        return parseFloat(cleanedPrice) || 0; // Convert to number, default to 0
    };

    const updateQuantity = (id, newQty) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQty } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleDelete = (id) => {
        // Filter out the item from the current cartItems state
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);

        // Update localStorage so the change persists
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setShowDelete(false);

        // Relaod window
        window.dispatchEvent(new Event("cartUpdated"));
    };
    const subtotal = cartItems.reduce(
        (acc, item) => acc + (formatPrice(item.price) * item.quantity),
        0
    );

    return (
        <div className="bg-[#f0f2f4] min-h-screen py-6 font-sans text-[#040c13]">
            <div className="max-w-300 mx-auto px-4">
                <h1 className="text-[22px] font-bold mb-4">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

                    {/* Left Section */}
                    <div className="lg:col-span-8 space-y-4">

                        {/* Special Offers Banner */}
                        <div className="bg-white p-4 border border-gray-200 flex items-center gap-2 text-[13px]">
                            <SiAdguard />
                            <p><span className="font-bold">Special Offers</span> We found offers available based on items in your cart! <button className="text-blue-600 hover:underline">See all</button></p>
                        </div>

                        {/* Cart Items Container */}
                        <div className="bg-white border border-gray-200">
                            {cartItems.length == 0 ? (
                                <div className="p-10 text-center text-gray-500">Your cart is empty.</div>
                            ) : (
                                cartItems.map((item, index) => {
                                    const unitPrice = formatPrice(item.price);
                                    const rowTotal = unitPrice * item.quantity;

                                    return (
                                        <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                            <div className="flex flex-col md:flex-row gap-4">
                                                {/* Image */}
                                                <div className="w-20 h-20 shrink-0">
                                                    <img src={item.images?.[0] || item.image} alt="Product Image" className="w-full h-full object-contain" />
                                                </div>

                                                {/* Title & Shipping */}
                                                <div className="grow space-y-1">
                                                    <Link to="#" className="text-[#0046be] text-[13px] hover:underline leading-tight block">
                                                        {item.title || item.name}
                                                    </Link>
                                                    <p className="text-[11px] text-gray-500">Sold by Best Buy</p>

                                                    <div className="mt-4 space-y-2 pt-2">
                                                        <div className="flex items-start gap-2 text-[13px]">
                                                            <input type="radio" checked readOnly className="mt-1" />
                                                            <div>
                                                                <p className="font-bold text-[#0046be]">Shipping to 00820</p>
                                                                <p className="text-gray-500 text-[11px]">Unavailable in this area</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Qty & Price Row */}
                                                <div className="flex gap-8 items-start">
                                                    <div className="flex flex-col items-center">
                                                        <select value={item.quantity} onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                                            className="border border-gray-400 rounded p-1 text-[13px] w-16 bg-white outline-none">
                                                            {[...Array(10).keys()].map(num => (
                                                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                                                            ))}
                                                        </select>
                                                        <button className="text-[#0046be] text-[11px] mt-2 hover:underline">Save for later</button>
                                                        <button onClick={() => { setItemToDelete(item.id); setShowDelete(true); }} className="text-red-600 text-[12px] mt-1 hover:underline cursor-pointer">Remove</button>
                                                    </div>

                                                    <div className="text-right min-w-[80px]">
                                                        <p className="text-[17px] font-bold">₦{rowTotal.toLocaleString()}</p>
                                                        <div className="bg-[#bb0628] text-white text-[10px] font-bold px-1 py-0.5 inline-block mt-1">
                                                            SAVE ₦{Math.floor(unitPrice * 0.09 * item.quantity).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Protection Plan placeholder */}
                                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 border rounded-full flex items-center justify-center text-[10px] border-gray-400 text-gray-400 font-bold">🛡️</div>
                                                    <span className="text-[13px] text-[#0046be] font-medium cursor-pointer hover:underline">Standard Geek Squad Protection</span>
                                                </div>
                                                <button className="border border-[#0046be] text-[#0046be] px-4 py-1.5 rounded text-[13px] font-medium hover:bg-blue-50 transition">See All Plans</button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Saved Items Placeholder */}
                        <div className="bg-white border border-gray-200 p-6 flex justify-between items-center cursor-pointer">
                            <h3 className="font-bold text-[17px] flex items-center gap-2"><span>♡</span> Saved Items</h3>
                            <span className="text-sm">^</span>
                        </div>
                    </div>

                    {/* Right Rail (Order Summary) */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white p-4 border border-gray-200 shadow-sm">
                            <h2 className="text-center font-bold text-xl mb-4">Order Summary</h2>

                            <div className="space-y-2 text-[13px]">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>₦{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Savings</span>
                                    <span className="text-gray-900 font-medium">₦{subtotal * 0.15.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-green-700 font-bold uppercase text-[11px]">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Estimated Sales Tax</span>
                                    <span>₦0.00</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 my-4 pt-4 flex justify-between items-center">
                                <span className="font-bold text-base">Total</span>
                                <span className="font-bold text-xl">₦{subtotal.toLocaleString()}</span>
                            </div>

                            <div className="space-y-2">
                                <button className="w-full bg-[#fff200] hover:bg-[#ffe000] py-3 cursor-pointer rounded font-bold text-[15px] transition-colors shadow-sm">
                                    Checkout
                                </button>
                                <button className="w-full bg-[#111] hover:bg-black py-2 rounded flex items-center justify-center transition-colors">
                                    <span className="text-blue-400 font-black italic">Pay</span>
                                    <span className="text-white font-black italic">Pal</span>
                                    <span className="text-white text-[12px] ml-1 uppercase font-bold">Checkout</span>
                                </button>
                            </div>

                            <div className="mt-4 pt-2 text-[11px] text-gray-500">
                                <Link to="#" className="text-blue-600 hover:underline">Sign in</Link> My Best Buy® members enjoy exclusive offers & free shipping.
                            </div>
                        </div>

                        {/* Credit Card Promo Section */}
                        <div className="bg-white p-4 border border-gray-200 flex items-start gap-4">
                            <img src={visa} alt="" className="w-40 object-contain" />
                            <div>
                                <p className="text-[14px] font-bold leading-tight">15% back in rewards</p>
                                <p className="text-[11px] text-gray-500 mt-1">on your first day of purchases when approved...</p>
                                <button className="text-blue-600 text-[11px] font-bold mt-2 hover:underline">Show me how &gt;</button>
                            </div>
                        </div>
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
};

export default CartPage;
