import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";
import { DataContent } from "../context/DataContext"; //Import useContext

const BASE_URL = "http://ecommerce.reworkstaging.name.ng/v2";

function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Usecontext instead of localStorage 
    const { merchantId } = useContext(DataContent);

    // Re-run fetch
    useEffect(() => {
        if(merchantId) {
            fetchProducts();
        }
    }, [merchantId]);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            //Use the global ID from context

            if (!merchantId) {
                toast.error("No merchant identity found!. Please log in.");
                return;
            }

            const response = await axios.get(`${BASE_URL}/products`, {
                params: {
                    merchant_id: merchantId,
                    limit: 100
                }
            });

            // Cleanly check both formats the API might return the array in
            const rawData = response.data;

            const actualData = rawData.data;
             console.log("API response for products:", actualData);

            const shopProducts = actualData.map((products) => ({
                ...products,
                id: products.id
            }));

            setProducts(shopProducts);

        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message || "Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productId = product.id;
        const existingIndex = cart.findIndex((item) => item.id == productId);

        if (existingIndex > -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success(`${product.title || "Product"} added to cart!`);
    };

    // Map through Categories safely using 'brand' property
    const categories = [...new Set(products.map(category_created => category_created.brand || "Uncategorized"))];

    if (loading) return <div className="text-center mt-20 animate-pulse text-blue-600 font-bold">Loading Best Buy Deals...</div>;
    if (error) return <div className="text-center mt-20 text-red-500 font-bold text-3xl">{error}</div>;

    return (
        <div className="md:w-[73%] mx-auto mt-12 mb-20 space-y-20">
            {categories.map((cat) => {
                const filteredProducts = products.filter(category_created => (category_created.brand || "Uncategorized") == cat);

                return (
                    <section key={cat}>
                        <div className="w-full mx-auto bg-gradient-to-r from-[#0046BE] to-[#009FBD] rounded-t-2xl p-6 shadow-lg">
                            <h2 className="text-[32px] font-bold text-white capitalize">{cat}</h2>
                        </div>
                        <div className="py-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={() => handleAddToCart(product)}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

export default ProductGrid;