import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const BASE_URL = "http://ecommerce.reworkstaging.name.ng/v2";

function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);
    const merchant_info = JSON.parse(localStorage.getItem("merchant_info"));
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const merchantId = merchant_info.id
            if (!merchantId) {
                toast.error("No merchant identity found!. Please log in or create a merchant.");
            }

            const response = await axios.get(`${BASE_URL}/products`, {
                params: {
                    merchant_id: merchantId,
                    limit: 100 // Increased limit from 10 - 100
                }
            });

            const apiData = response.data.data || response.data;
            // console.log("API Response Data:", actualData);

            const shopProduct = apiData.map((product) => ({
                ...product,
                id: product.id // To attach or get product id
            }));

            setProducts(shopProduct);

            //Error field
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message || "Failed to load products.");
        } finally {
            setLoading(false);
        }
        const fetchAdminProducts = async () => {
            try {
                const merchantId = localStorage.getItem("merchant_id");
                const response = await axios.get(`${BASE_URL}/products`, {
                    params: { merchant_id: merchantId }
                });

                console.log("Full API Response:", response.data);

                // This line checks every possible way the API might send the list
                const rawData = response.data;
                setProducts(rawData.data);

            } catch (err) {
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
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
        toast.success(`${product.title} added to cart!`);
        setLoading(false);
    };

    //To map through Categories
    const categories = [...new Set(products.map(categoey_created => categoey_created.brand || "Uncategorized"))];

    if (loading) return <div className="text-center mt-20 animate-pulse text-blue-600 font-bold">Loading Best Buy Deals...</div>;
    if (error) return <div className="text-center mt-20 text-red-500 font-semibold">{error}</div>;

    return (
        <div className="md:w-[73%] mx-auto mt-12 mb-20 space-y-20">
            {categories.map((cat) => {
                //Filter products to et specific category
                const filteredProducts = products.filter(categoey_created => (categoey_created.brand || "Uncategorized") == cat);

                return (
                    <section key={cat}>
                        <div className="w-full mx-auto bg-gradient-to-r from-[#0046BE] to-[#009FBD] rounded-t-2xl p-6 shadow-lg">
                            <h2 className="text-[32px] font-bold text-white capitalize">
                                {cat} Deals
                            </h2>
                        </div>
                        <div className="py-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  ">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
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