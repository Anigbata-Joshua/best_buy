import { useState } from 'react';
import { LuStore } from "react-icons/lu";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function RegisterMerchant() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [store_name, setStoreName] = useState("");
    const [descp, setDescp] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [checkValue, setCheckValue] = useState(false);
    const navigate = useNavigate();


    // Changed to an async function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCheckValue(true);
        setErrorMsg("");

        if (!first_name || !last_name || !email || !phone || !store_name || !descp || !password) {
          setCheckValue(true)
            return;
        }

        setLoading(true);

        const merchant_info = {
            first_name,
            last_name,
            email,
            phone,
            store_name,
            descp,
            password
        };

        const base_url = "http://ecommerce.reworkstaging.name.ng/v2";

        try {
            // fetch api
            const response = await axios.post(`${base_url}/merchants`, merchant_info);
            if (response.status == 201 || response.status == 200) {

                const merchantData = response.data;
                const merchantId = merchantData.id || merchantData._id || merchantData.data?.id;
                // Save on localstorage
                localStorage.setItem("merchant_id", merchantId);
                localStorage.setItem("merchant_info", JSON.stringify(merchantData));

                toast.success("Welcome aboard! Registration successful.");
                navigate('/admin/login');
                console.log(response.data);
            }

        } catch (err) {
            // Error handling for await
            const serverError = err.response?.data?.msg || "An error occurred during registration";
            setErrorMsg(serverError);
            toast.error(serverError);
            console.error("Registration Error Details:", err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans py-12 px-4">
            <div className="max-w-lg mx-auto mb-10 text-center">
                <div className="inline-block p-4 bg-blue-100 mb-4 shadow-sm">
                    <LuStore className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Merchant Registration</h2>
                <p className="text-slate-500 mt-2">Join our premium Best Buy market place and start selling today.</p>
            </div>

            <div className="max-w-lg mx-auto bg-white p-8 md:p-10 shadow-sm shadow-slate-200/60 border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">First Name</label>
                            <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 outline-none" />
                            {checkValue && !first_name && <p className="text-[10px] text-red-500 font-bold ml-1">This field can't be empty</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
                            <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 outline-none" />
                            {checkValue && !last_name && <p className="text-[10px] text-red-500 font-bold ml-1">This field can't be empty</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                            <input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 outline-none" />
                            {checkValue && !email && <p className="text-[10px] text-red-500 font-bold ml-1">This field can't be empty</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 outline-none" />
                            {checkValue && !phone && <p className="text-[10px] text-red-500 font-bold ml-1">This field can't be empty</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Boutique Name</label>
                        <input type="text" value={store_name} onChange={(e) => setStoreName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 outline-none" />
                        {checkValue && !store_name && <p className="text-[10px] text-red-500 font-bold ml-1">This field can't be empty</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Store Description</label>
                        <textarea rows="2" placeholder="Tell us what you sell..." value={descp} onChange={(e) => setDescp(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 outline-none"></textarea>
                        {checkValue && !descp && <p className="text-[10px] text-red-500 font-bold ml-1">This field can't be empty</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                        <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 outline-none" />
                        {checkValue && !password && <p className="text-[10px] text-red-500 font-bold ml-1">This field can't be empty</p>}
                    </div>

                    {errorMsg && (
                        <div className="bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest text-center py-3 rounded-xl border border-red-100">
                            {errorMsg}
                        </div>
                    )}

                    <button disabled={loading} type="submit"
                        className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl tracking-widest uppercase text-xs transition-all shadow-lg disabled:opacity-50">
                        {loading ? "Registering..." : "Create Merchant Account"}
                    </button>
                </form>

                <p className="mt-10 text-center text-slate-400 text-sm">
                    Already have an account?
                    <Link to="/login" className="text-blue-600 font-bold ml-2 hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterMerchant;