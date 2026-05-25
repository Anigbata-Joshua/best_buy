import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

function CreateUser() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkValue, setCheckValue] = useState(false);
    const [message, setMessage] = useState({ text: '', color: '' });

    const merchant_id = localStorage.getItem("merchant_id");
    async function handleSubmit(e) {
        e.preventDefault();
        setCheckValue(true);

        // Validation
        if (!first_name || !last_name || !email || !phone || !password) {
            toast.error("All fields cannot be empty")
            return;
        }

        setLoading(true);
        setMessage({ text: '', color: '' });

        const user_info = {
            first_name,
            last_name,
            email,
            phone,
            password,
            merchant_id
        };

        axios.post("http://ecommerce.reworkstaging.name.ng/v2/users", user_info)
            .then((response) => {
                setLoading(false);
                if (response.status === 201 || response.status === 200) {
                    toast.success({ text: 'User Created Successfully!', color: "text-green-600" });
                    setFirstName(""); setLastName(""); setEmail(""); setPhone(""); setPassword("");
                    setCheckValue(false);

                }
            })
            .catch((err) => {
                setLoading(false);
                const errorMsg = err.response?.data?.msg || "An error occurred";
                toast.error({ text: errorMsg, color: "text-red-500" });
                console.log(err);
            });
    }

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            <main className="flex-1 flex items-center justify-center p-10">
                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8 w-full max-w-xl">
                    <div className="mb-8 text-center">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em] block mb-2">Member Portal</span>
                        <h2 className="text-2xl font-semibold text-gray-800">Register New User</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input type="text" placeholder="Enter First Name" className="border border-gray-200 p-3 w-full rounded-lg outline-none" value={first_name}
                                onChange={(e) => setFirstName(e.target.value)} />
                            {checkValue && !first_name && <span className="text-xs text-red-500">First name required</span>}
                        </div>
                        <div>
                            <input type="text" placeholder="Enter Last Name" className="border border-gray-200 p-3 w-full rounded-lg outline-none" value={last_name}
                                onChange={(e) => setLastName(e.target.value)} />
                            {checkValue && !last_name && <span className="text-xs text-red-500">Lastname required</span>}
                        </div>
                        <div>
                            <input type="email" placeholder="Enter email" className="border border-gray-200 p-3 w-full rounded-lg outline-none" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            {checkValue && !email && <span className="text-xs text-red-500">Email required</span>}
                        </div>
                        <div>
                            <input type="text" placeholder="Enter phone number" className="border border-gray-200 p-3 w-full rounded-lg outline-none" value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                            {checkValue && !phone && <span className="text-xs text-red-500">Phone number required</span>}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="border border-gray-200 p-3 w-full rounded-lg outline-none focus:border-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {checkValue && !password && <span className="text-xs text-red-500">Password required</span>}
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className={`w-full bg-blue-950 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-lg mt-4 cursor-pointer ${loading ? 'opacity-50' : 'hover:bg-black'}`}
                        >
                            {loading ? 'Processing...' : 'Create User Account'}
                        </button>
                    </form>

                    {message.text && (
                        <div className={`mt-6 text-center text-[10px] uppercase tracking-widest font-bold ${message.color}`}>
                            {message.text}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CreateUser;