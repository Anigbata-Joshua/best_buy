import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/Homepage_img/bbylogo.png";
import { IoLocationOutline } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";
import { CiDollar, CiLock } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import toast from 'react-hot-toast';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkValue, setCheckValue] = useState(false);

    const navigate = useNavigate()
    const merchant_id = localStorage.getItem("merchant_id");
    async function handleSubmit(e) {
        e.preventDefault();
        setCheckValue(true);

        if (!email || !password) {
            toast.error("All fields are required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        const login_info = {
            email: email,
            password: password,
            merchant_id: merchant_id
        };

        try {
            const response = await axios.post("http://ecommerce.reworkstaging.name.ng/v2/users/login", login_info);
            setLoading(false);

            if (response.status === 201 || response.status === 200) {
                toast.success('Login Successfully!');

                // Reset form
                setEmail(""); setPassword("");
                setCheckValue(false);
                navigate("/");
            }
        } catch (err) {
            setLoading(false);
            const errorMsg = err.response?.data?.msg || "An error occurred";
            toast.error(errorMsg);
            console.error(err);
        }
    }
    return (
        <div className="min-h-screen bg-white font-sans">
            <Link to="/">
                <nav className="bg-[#0046be] py-3 px-4 flex items-center">
                    <img src={logo} alt="Best Buy Logo" className="w-16 md:w-20" />
                </nav>
            </Link>
            <Link to="/">
                <div className="py-2 px-4 ">
                    <button className="text-[#0046be] text-sm font-bold flex items-center hover:underline">
                        <span className="mr-1">‹</span> Back to previous page
                    </button>
                </div>
            </Link>

            <div className="w-full max-w-275 mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-20">

                    {/* Left Side: Sign In Form */}
                    <div className="w-full md:w-112.5">
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-[40px] text-[#0046be] font-bold leading-tight">Sign In</h1>
                            <p className='text-sm text-gray-600 mt-2'> Enjoy a smoother shopping experience both in-store and online.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="flex flex-col">
                                <label className="text-sm font-bold text-gray-800 mb-1">Email Address</label>
                                <input name="email" type="email" className="border border-gray-400 p-2.5 outline-none focus:ring-1 focus:ring-[#0046be] h-12" onChange={(e) => setEmail(e.target.value)} />
                                {checkValue && !email && <p className="text-[10px] text-red-500 font-bold ml-1">This field can't be empty</p>}
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-bold text-gray-800 mb-1">Password</label>
                                <input name="password" type="password" className="border border-gray-400 p-2.5 outline-none focus:ring-1 focus:ring-[#0046be] h-12" onChange={(e) => setPassword(e.target.value)} />
                                {checkValue && !password && <p className="text-[10px] text-red-500 font-bold ml-1">This field can't be empty</p>}
                            </div>

                            <button type="submit" className="w-full md:w-40 bg-[#001e73] hover:bg-[#00185c] text-white font-bold py-3 px-6 shadow-md text-sm transition-colors cursor-pointer">
                                Sign In
                            </button>
                        </form>
                    </div>

                    {/* Right Side: Join My Best Buy */}
                    <div className="flex-1 max-w-md border-t md:border-t-0  pt-10 md:pt-0 md:pl-16">
                        <div className="mb-6">
                            <h2 className="flex items-center text-lg mb-1">
                                <span className="lowercase">my</span>
                                <span className="font-extrabold uppercase ml-1 tracking-tighter">BEST BUY</span>
                            </h2>
                            <h3 className="text-2xl font-bold text-black leading-tight">
                                Don't have a free My Best Buy account?
                            </h3>
                        </div>

                        <p className="text-[14px] font-bold text-gray-700 mb-6">Here are some of the benefits you'll enjoy:</p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <GiShoppingCart className="text-[#0046be] text-2xl mt-1" />
                                <div>
                                    <p className="font-bold text-[14px]">Checkout in a flash.</p>
                                    <p className="text-sm text-gray-600">Use your saved payment info and you're ready to go.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <IoLocationOutline className='text-[#0046be] text-2xl mt-1' />
                                <div>
                                    <p className="font-bold text-[14px]">Track it all.</p>
                                    <p className="text-sm text-gray-600">Easily follow your order and view both store and online purchases anytime.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <CiDollar className="text-[#0046be] text-2xl mt-1" />
                                <div>
                                    <p className="font-bold text-[14px]">Exclusive offers.</p>
                                    <p className="text-sm text-gray-600">Unlock special deals just for you.</p>
                                </div>
                            </div>

                            <div className='pt-4'>
                                <Link to="/signup" className='group flex items-start gap-3'>
                                    <span className='text-[#0046be] font-bold flex items-center gap-1 group-hover:underline'>
                                        Create an account
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Styled Form Footer */}
            <div className="bg-white py-12 border-t border-gray-200 mt-20 shadow-2xl">
                <div className="w-full max-w-275 mx-auto px-6">
                    <div className=" md:flex-row">
                        <div>
                            <div className='flex gap-2'>
                                <CiLock className='text-3xl' />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Security and privacy
                                </h3>
                            </div>
                            <p className="text-[14px] text-gray-600 leading-relaxed">
                                Every transaction on BestBuy.ca is secure. Any personal information you give us will be handled according to our{" "}
                                <span className="text-[#0046be] underline cursor-pointer hover:no-underline">Privacy Policy.</span>
                            </p>
                        </div>

                        <div className='py-4'>
                            <div className='flex gap-2'>
                                <HiOutlineQuestionMarkCircle className='text-3xl' />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Support
                                </h3>
                            </div>
                            <p className="text-[14px] text-gray-600 leading-relaxed">
                                Need assistance?{" "}
                                <span className="text-[#0046be] underline cursor-pointer hover:no-underline font-medium">
                                    Visit the Help Centre
                                </span>{" "} to get answers to common questions about shipping, returns, and more.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;