import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    // 1. Destructure properties safely
    const { id, title, price, images, brand } = product;

    const cleanPrice = (val) => {
        if (typeof val === "number") return val;
        return parseFloat(String(val || "0").replace(/[^\d.]/g, "")) || 0;
    };

    const numericPrice = cleanPrice(price);
    const productImage = images?.[0] || product.image || "https://placehold.co/200x200";

    return (
        <div className="bg-white border-b md:border md:rounded-sm border-gray-200 p-4 flex flex-col h-full transition-shadow group">
            {/* Product Image - Links to Detail Page */}
            <Link to={`/product/${product.id}`}>
                <div className="relative h-48 w-full mb-3 flex items-center justify-center overflow-hidden">
                    <p className="block h-full w-full">
                        <img src={productImage} alt={title} className="max-h-full max-w-full mx-auto object-contain" />
                    </p>
                </div>

                {/* Product Title - Links to Detail Page */}
                <div className="grow">
                    <p className="text-[#0046be] text-[13px] md:text-[14px] leading-tight hover:underline font-normal line-clamp-3 mb-1 block">
                        {title}
                    </p>

                    {/* Brand & Rating Placeholder */}
                    <p className="text-[11px] text-gray-500 mb-2 font-medium uppercase tracking-tighter">
                        {brand || "Best Buy Selection"}
                    </p>

                    <div className="flex items-center mb-3">
                        <div className="flex text-[#ffe000] text-[10px]">
                            ★ ★ ★ ★ ★
                        </div>
                        <span className="text-[#0046be] text-[11px] ml-1 hover:underline cursor-pointer">(4.8)</span>
                    </div>
                </div>

                {/* Price and CTA Section */}
                <div className="mt-auto pt-2">
                    <div className="flex flex-col mb-3">
                        <span className="text-[20px] md:text-[24px] font-bold text-[#040c13]">
                            ₦{numericPrice.toLocaleString()}
                        </span>

                        {/* Savings Badge */}
                        <div className="flex items-center gap-1 mt-1">
                            <span className="bg-[#bb0628] text-white text-[10px] font-bold px-1 py-0.5 uppercase">
                                Save ₦{(numericPrice * 0.11).toLocaleString()}
                            </span>
                            <span className="text-[11px] text-gray-500 line-through">
                                ₦{(numericPrice * 1.11).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Best Buy Blue "Add to Cart" Button */}
                    <button
                        onClick={(e) => { e.preventDefault(); onAddToCart(product) }}// Prevents link navigation ;
                        className="w-full bg-[#0046be] hover:bg-[#003591] cursor-pointer text-white flex items-center justify-center gap-2 py-2 rounded-md font-bold text-[13px] transition-colors shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </Link>
        </div>
        
    );
};

export default ProductCard;