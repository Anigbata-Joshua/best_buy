import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { SlPrinter } from "react-icons/sl";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { HiChevronRight } from "react-icons/hi";
import logo from "../assets/images/Homepage_img/bbylogo.png"

const Nav = () => {
    const [openHamburger, setOpenHamburger] = useState(false);
    const [hover, setHover] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    const savedUser = localStorage.getItem("bestbuy_customer");
    const user = savedUser ? JSON.parse(savedUser) : null;

    //Calculate total items from local storage
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setCartCount(total);
    };

    useEffect(() => {
        updateCartCount();
        window.addEventListener("cartUpdated", updateCartCount);
        return () => window.removeEventListener("cartUpdated", updateCartCount);
    }, []);

    const categories = [
        { id: 1, name: "Deals", blue: true },
        { id: 2, name: "Brands", blue: true, sub_menu: ["Apple", "ASUS", "Beats", "Dell", "GE", "HP", "Lenovo", "LG", "Meta", "Nintendo", "Samsung", "Sony"] },
        { id: 3, name: "Discover", blue: true },
        { id: 4, name: "Support & Services", blue: true, sub_menu: ["Visit our Support Center", "Repair & Tech Services", "Remote Support", "Manage an Appointment", "Trade In Your Device", "Check Repair Status", "Best Buy Brands Support", "Best Buy Business Professional Services", "Learn About Services by Category", "Computer & Tablet Services", "TV & Home Theater Services", "Appliance Services", "Cell Phone Services", "Apple Authorized Repair", "Smart Home Services", "Car Electronics Professional Installation", "Fitness Equipment Services", "All Services"] },
        { id: 5, name: "Shop by Department", header: true },
        { id: 6, name: "TV & Home Theater", },
        { id: 7, name: "Computers & Tablets", sub_menu: ["Laptops", "Desktops", "Tablets", "Monitors"] },
        { id: 8, name: "Appliances", sub_menu: ["Refrigerators", "Washers & Dryers", "Ranges & Ovens"] },
        { id: 9, name: "Small Kitchen Appliances" },
        { id: 10, name: "Video Games" },
        { id: 11, name: "Cell Phones" },
        { id: 12, name: "Headphones" },
        { id: 13, name: "Home Audio & Speakers" },
        { id: 14, name: "Music, Movies & TV Shows" },
        { id: 15, name: "Cameras, Camcorders & Drones" },
        { id: 16, name: "Wearable Technology" },
        { id: 17, name: "Smart Home, Security & Wi-Fi" },
        { id: 18, name: "Home, Furniture & Office" },
        { id: 19, name: "Sports Fan Shop" },
        { id: 20, name: "Fitness, Sports & Outdoor" },
        { id: 21, name: "Smart Home, Security & Wi-Fi" },
        { id: 22, name: "Toys, Games & Crafts" },
        { id: 23, name: "Car Electronics & GPS" },
        { id: 24, name: "Collectibles & Memorabilia" }
    ];

    return (
        <header className="w-full font-sans shadow-md relative">
            <div className="bg-[#013196] text-[#E0E6Ef] py-2 px-8">
                <div className="max-w-375 mx-auto flex gap-6 text-[11px] font-medium">
                    <a href="#" className="hover:underline">Yardbird</a>
                    <a href="#" className="hover:underline">Best Buy Outlet</a>
                    <a href="#" className="hover:underline">Best Buy Business</a>
                </div>
            </div>

            <div className="bg-[#0046BE] text-white relative">
                <div className="max-w-375 mx-auto px-4 md:px-8 py-3">
                    <div className="flex items-center gap-3">
                        <div><Link to="/"><img src={logo} alt="Brand Logo" className='w-18 ml-6' /></Link></div>
                        <div className="flex items-center gap-4 shrink-0">

                            <div className="relative">
                                <div className="hidden md:flex items-center gap-2 font-bold text-sm px-2 py-1">
                                    <button onClick={() => setOpenHamburger(!openHamburger)} className='text-2xl cursor-pointer hover:opacity-80'>
                                        {openHamburger ? <IoMdClose /> : <RxHamburgerMenu />}
                                    </button>
                                    <button onClick={() => setOpenHamburger(!openHamburger)} className='text-xl cursor-pointer hover:opacity-80'>
                                        Menu
                                    </button>
                                </div>

                                {openHamburger && (
                                    <div className="flex absolute top-full left-5 bg-white shadow-2xl z-120 mt-4 border border-gray-200 overflow-hidden text-black">
                                        <nav className="scroll_bar w-100 h-screen overflow-y-auto pb-40 scrollbar-thin scrollbar-thumb-gray-300">
                                            {categories.map((item) => (
                                                <div key={item.id} onMouseEnter={() => !item.header && setHover(item)}>
                                                    {item.header ? (
                                                        <div className="px-4 py-5 text-gray-500 font-medium text-md border-t border-gray-100 mt-2 bg-gray-50 uppercase text-[18px] tracking-wider">
                                                            {item.name}
                                                        </div>
                                                    ) : (
                                                        <button className={`w-full flex items-center justify-between px-5 py-3 border-b border-gray-50 hover:bg-gray-100 group text-left transition-colors ${hover?.id === item.id ? "bg-gray-100" : ""}`}>
                                                            <span className={`text-[13px] ${item.blue ? "text-[#0046be] font-bold" : "text-[#0046be] font-normal"}`}>
                                                                {item.name}
                                                            </span>
                                                            <HiChevronRight className={`text-gray-400 group-hover:text-[#0046be] ${hover?.id === item.id ? "text-[#0046be]" : ""}`} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </nav>

                                        {/* sub_menu */}
                                        {hover?.sub_menu && (
                                            <div
                                                className="w-[320px] bg-white text-black p-6 overflow-y-auto animate-in fade-in slide-in-from-left-2 duration-200 border-l border-gray-100"
                                                onMouseLeave={() => setHover(null)}>
                                                <h3 className="font-semibold text-lg mb-4 border-b pb-2">{hover.name}</h3>
                                                <ul className="space-y-3">
                                                    {hover.sub_menu.map((sub, index) => (
                                                        <li key={index} className="text-[15px] my-4 text-blue-900 hover:underline cursor-pointer ">
                                                            {sub}
                                                        </li>
                                                    ))}

                                                    <li className="text-sm font-bold text-blue-700 pt-4 cursor-pointer hover:underline">
                                                        See All {hover.name}
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="hidden md:flex grow relative max-w-2xl w-full">
                            <input type="text" placeholder="Search Best Buy" className="w-full py-2 px-4 pr-10 text-black bg-gray-200 rounded-sm focus:outline-none text-sm" />
                            <button className="absolute right-3 top-2 "><RiSearch2Line className='text-black text-xl' /></button>
                        </div>

                        <div className="flex items-center gap-4 md:gap-6 text-xl pl-10 md:text-sm font-semibold shrink-0">
                            <div className="hidden lg:flex items-center gap-2 cursor-pointer ">
                                <div className="text-2xl"><SlPrinter /></div>
                                <span className="text-[17px]">Hato Rey</span>
                            </div>
                            <Link to="/cart">
                                <div className="flex items-center gap-2 cursor-pointer group relative">
                                    <div className="relative">
                                        <BsCart3 className="text-2xl group-hover:text-yellow-300 transition-colors" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-yellow-400 text-[#0046be] text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-[#0046be] animate-in zoom-in duration-300">
                                                {cartCount}
                                            </span>
                                        )}
                                    </div>

                                    <span className="hidden md:inline text-[17px] group-hover:underline font-bold">
                                        Cart
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3 md:hidden">
                        <button onClick={() => setOpenHamburger(!openHamburger)} className="text-3xl leading-none font-light">
                            {openHamburger ? <IoMdClose /> : "≡"}
                        </button>
                        <div className="relative grow">
                            <input type="text" placeholder="Search Best Buy" className="w-full py-2 px-4 pr-10 rounded-sm text-black text-sm bg-gray-200 focus:outline-none" />
                            <button className="absolute right-3 top-2 text-black "><RiSearch2Line /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden md:block bg-[#0046BE] border-t border-blue-500 text-white text-[13px] py-4 px-8 ">
                <div className="max-w-375 mx-auto flex justify-between items-center gap-6">
                    <ul className="flex gap-5 font-medium overflow-x-auto no-scrollbar">
                        <li className="hover:underline cursor-pointer"><Link to="/shop">Top Deals</Link></li>
                        <li className="hover:underline cursor-pointer">Deal of the Day</li>
                        <li className="hover:underline cursor-pointer">Discover </li>
                        <li className="hover:underline cursor-pointer">My Best Buy Memberships</li>
                    </ul>
                    <ul className="flex gap-6 font-medium shrink-0 ">
                        <div className="flex items-center gap-4">
                            {user ? (
                            <Link to="/signup">
                                <div className="flex items-center gap-2">
                                    <CgProfile className="text-2xl" />
                                    <span className="text-sm font-bold">
                                        Welcome, {user.last_name}
                                    </span>
                                </div>
                            </Link>
                            ) :(
                                <Link to="/loginUser" className="flex items-center gap-2 hover:underline">
                                    <CgProfile className="text-2xl" />
                                    <span className="text-sm font-bold">Sign In</span>
                                </Link>
                            )}
                        </div>
                        <li className="cursor-pointer whitespace-nowrap flex gap-1">Recently Viewed <span className='mt-1'><AiOutlineDown /></span></li>
                        <li className="cursor-pointer whitespace-nowrap">Order Status</li>
                    </ul>
                </div>
            </div>

            {openHamburger && (
                <div
                    className="fixed inset-0 bg-black/40 z-110"
                    onClick={() => {
                        setOpenHamburger(false);
                        setHover(null);
                    }}
                />
            )}
        </header>
    );
};

export default Nav;