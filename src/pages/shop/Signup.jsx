import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-hot-toast';
import logo from "../../assets/images/Homepage_img/bbylogo.png";
import { IoLocationOutline } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";
import { CiDollar, CiLock } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

function SignupForm() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkValue, setCheckValue] = useState(false);

    const navigate = useNavigate();
    const merchant_id = localStorage.getItem("merchant_id");

    const baseUrl = "http://ecommerce.reworkstaging.name.ng/v2/"
    async function handleSubmit(e) {
        e.preventDefault();
        setCheckValue(true);

        // Basic Validation
        if (!firstname || !lastname || !email || !password) {
            toast.error("All fields are required");
            return;
        }

        // Email Format Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        // Password Length Validation
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        const user_info = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password,
            phone: "08000000000",
            merchant_id: merchant_id
        };

        try {
            const response = await axios.post(`${baseUrl}/user`, user_info);
            setLoading(false);

            if (response.status === 201 || response.status === 200) {
                toast.success('User Created Successfully!');
                const userData = response.data;

                localStorage.setItem("bestbuy_customer", JSON.stringify(userData));

                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setCheckValue(false);

                navigate("/login-user");
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
                <div className="bg-white py-2 px-4">
                    <button className="text-[#0046be] text-sm font-bold flex items-center hover:underline">
                        <span className="mr-1">‹</span> Back to previous page
                    </button>
                </div>
            </Link>

            <div className="w-full max-w-275 mx-auto px-6 py-10">
                {/* Header Section */}
                <div className="mb-10">
                    <h2 className="flex items-center text-xl mb-2">
                        <span className="lowercase">my</span>
                        <span className="font-extrabold uppercase ml-1 tracking-tighter">BEST BUY</span>
                        <span className="text-yellow-400 text-3xl ml-0.5 leading-none mt-1">.</span>
                    </h2>
                    <h1 className="text-3xl md:text-[40px] text-[#0046be] font-bold leading-tight">
                        Create a My Best Buy account
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row gap-16">
                    <div className="w-full md:w-112.5">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-col">
                                <label className="text-sm font-bold text-gray-800 mb-1">First Name</label>
                                <input name="firstname" type="text" className="border border-gray-400 p-2.5 outline-none focus:ring-1 focus:ring-[#0046be] h-12" onChange={(e) => setFirstName(e.target.value)} />
                                {checkValue && !firstname && <p className="text-[10px] text-red-500 font-bold ml-1">This field can't be empty</p>}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-bold text-gray-800 mb-1">Last Name</label>
                                <input name="lastname" type="text" className="border border-gray-400 p-2.5 outline-none focus:ring-1 focus:ring-[#0046be] h-12" onChange={(e) => setLastName(e.target.value)} />
                                {checkValue && !lastname && <p className="text-[10px] text-red-500 font-bold ml-1">This field can't be empty</p>}
                            </div>

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

                            <div className="flex items-start gap-3 py-2">
                                <input type="checkbox" className="mt-1 w-5 h-5 border-gray-400" id="newsletter" />
                                <label htmlFor="newsletter" className="text-sm text-gray-700 leading-tight">
                                    <p className='text-sm'> Sign up for our newsletter to stay in the loop about hot deals,<br /> new products, and more. Don't worry, you can unsubscribe at any time.
                                    </p>
                                </label>
                            </div>

                            <div>
                                <button type="submit" className="w-[40%] bg-[#FFCE00] hover:bg-[#ffe000] text-black font-bold py-3 rounded shadow-sm text-sm cursor-pointer">
                                    Create Account
                                </button>
                            </div>
                            <div className="flex items-start gap-3 py-2 border-b border-gray-200 ">
                                <p className='text-gray-500 text-sm mb-3'>By continuing you agree to our <span className='text-blue-500 underline'>Terms and Conditions</span><br />and <span className='text-blue-500 underline'>Privacy Policy</span>,<br />
                                    and confirm you have reached the age of majority (18 or 19) in your province or territory of residence.
                                </p>
                            </div>
                            <div className='flex gap-2'>
                                <CgProfile className='text-3xl' /> <span>Already have my Best Buy account? <br /><Link to="/loginUser" className='text-blue-800 font-bold flex items-center gap-4'>
                                    Sign in <span><IoIosArrowForward className='text-sm' /></span>
                                </Link></span>
                            </div>
                        </form>
                    </div>

                    {/* Right Side: Benefits Section */}
                    <div className="flex-1 max-w-sm">
                        <p className="text-[15px] font-bold text-gray-700 mb-6">Here are some of the benefits you'll enjoy:</p>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <GiShoppingCart className="text-[#0046be] text-4xl pt-1 font-bold" />
                                <div>
                                    <p className="font-bold text-[15px]">Checkout in a flash.</p>
                                    <p className="text-sm text-gray-600">Use your saved payment info and you're ready to go.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <IoLocationOutline className='text-[#0046be] text-4xl pt-1 font-bold' />
                                <div>
                                    <p className="font-bold text-[15px]">Track it all.</p>
                                    <p className="text-sm text-gray-600">Easily follow your order and view both store and online purchases anytime.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <CiDollar className="text-[#0046be] text-4xl pt-1 font-bold" />
                                <div>
                                    <p className="font-bold text-[15px]">Exclusive offers.</p>
                                    <p className="text-sm text-gray-600">Unlock special deals just for you.</p>
                                    <p></p>
                                </div>
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

}
export default SignupForm;