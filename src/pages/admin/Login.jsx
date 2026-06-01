import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { useContext, useState } from "react";
import { toast } from 'react-hot-toast';
import { DataContent } from "../../context/DataContext";

function MerchantLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(DataContent);
     const [checkValue, setCheckValue] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setCheckValue(true)
            return;
        }

        setLoading(true);
        const BASE_URL = "http://ecommerce.reworkstaging.name.ng/v2";

        try {
            const resp = await axios.post(`${BASE_URL}/merchants/login`, { email, password });

            // Assuming API returns merchant object directly
            const merchant = resp.data;

            if (merchant && merchant.id && merchant.email) {
                toast.success("Login Successful");
                localStorage.setItem("merchant_info", JSON.stringify({ id: merchant.id, email: merchant.email, first_name: merchant.first_name }));

                setUser((prev) => ({ ...prev, id: merchant.id, email: merchant.email }));
                navigate("/admin");
            } else {
                toast.error("Invalid email or password");
            }
        } catch (error) {
            console.error(error);
            if (error.response?.data?.msg) {
                toast.error(error.response.data.msg);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans py-12 px-4">
            <div className="max-w-md mx-auto mb-10 text-center">
                <div className="inline-block p-4 bg-blue-100 mb-4 shadow-sm">
                    <LuLogIn className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome Back</h2>
                <p className="text-slate-500 mt-2">Access your merchant dashboard</p>
            </div>

            <div className="max-w-md mx-auto bg-white p-8 md:p-10 shadow-sm shadow-slate-200/60 border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                            Email Address
                        </label>
                        <input type="email" placeholder="name@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 outline-none text-slate-700" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                             {checkValue && !email && <span className="text-xs text-red-500">Email required</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                            Password
                        </label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 outline-none text-slate-700" value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                             {checkValue && !password && <span className="text-xs text-red-500">Password required</span>}
                    </div>

                    <button
                        disabled={loading} type="submit" className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl tracking-widest uppercase text-xs transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 cursor-pointer">
                        {loading ? "Authenticating..." : "Login to Dashboard"}
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-400 text-sm">
                    Don't have an account?
                    <Link to="/admin/register" className="text-blue-600 font-bold ml-2 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default MerchantLogin;