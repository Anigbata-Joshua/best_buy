
import { GoQuestion } from "react-icons/go";
import { CiDollar } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { TfiExchangeVertical } from "react-icons/tfi";
import { TiSocialFacebook } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialPintarest } from "react-icons/sl";
import { TiSocialYoutube } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { FiBox } from "react-icons/fi";

function Footer() {
    return (
        <div className="mt-6">
            <footer className="w-full bg-[#f0f2f4]  text-[#0046be] py-8 md:py-12">
                <div className="w-full border-b border-gray-300 pb-8 mb-10 px-4">
                    <div className="max-w-300 mx-auto flex flex-nowrap overflow-x-auto md:flex-wrap md:justify-center lg:justify-between items-start gap-6 md:gap-8 lg:gap-4 no-scrollbar py-2">
                        {[
                            { icon: <GoQuestion />, label: "Visit our support center" },
                            { icon: <FiBox />, label: "Check your order status" },
                            { icon: <CiDeliveryTruck />, label: "Shipping, Delivery & Store Pickup" },
                            { icon: <TfiExchangeVertical />, label: "Returns & Exchanges" },
                            { icon: <CiDollar />, label: "Price Match Guarantee" },
                        ].map((item, index) => (
                            <div key={index}
                                className="flex flex-col items-center text-center min-w-35 md:min-w-40 lg:min-w-0 lg:max-w-45 group cursor-pointer"
                            >
                                <div className="icon_container text-5xl md:text-4xl lg:text-3xl text-gray-500 group-hover:text-[#0046be] transition-colors duration-200">
                                    {item.icon}
                                </div>
                                <p className="under_text mt-3 text-[12px] md:text-[13px] font-bold text-[#0046be] group-hover:underline leading-tight px-2">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mx-auto px-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
                    <div className="link_area col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-semibold text-black mb-4 border-b md:border-none pb-2 md:pb-0">Order & Purchases</h4>
                                <ul className="text-[12px] space-y-2">
                                    <li><a href="#" className="hover:underline">Check Order Status</a></li>
                                    <li><a href="#" className="hover:underline">Shipping, Delivery & Pickup</a></li>
                                    <li><a href="#" className="hover:underline">Returns & Exchanges</a></li>
                                    <li><a href="#" className="hover:underline">Price Match Guarantee</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-black mb-4 border-b md:border-none pb-2 md:pb-0">Payment Options</h4>
                                <ul className="text-[12px] space-y-2">
                                    <li><a href="#" className="hover:underline">My Best Buy® Credit Card</a></li>
                                    <li><a href="#" className="hover:underline">Pay Your Bill at Citibank</a></li>
                                    <li><a href="#" className="hover:underline">Lease to Own</a></li>
                                    <li><a href="#" className="hover:underline">Buy Now, Pay Later</a></li>
                                    <li><a href="#" className="hover:underline">Best Buy Business Finacing</a></li>

                                </ul>
                            </div>
                        </div>

                        {/* Group 2 */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-semibold text-black mb-4 border-b md:border-none pb-2 md:pb-0">Support & Services</h4>
                                <ul className="text-[12px] space-y-2">
                                    <li><a href="#" className="hover:underline">Visit our Support Center</a></li>
                                    <li><a href="#" className="hover:underline">Shop with an Expert</a></li>
                                    <li><a href="#" className="hover:underline">Schedule a Service</a></li>
                                    <li><a href="#" className="hover:underline">Manage an Appointment</a></li>
                                    <li><a href="#" className="hover:underline capitalize">Promotion And Support plans</a></li>
                                    <li><a href="#" className="hover:underline capitalize">haul away and recycling</a></li>
                                    <li><a href="#" className="hover:underline capitalize">contact us</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-black mb-4 border-b md:border-none pb-2 md:pb-0">Rewards & Membership</h4>
                                <ul className="text-[12px] space-y-2">
                                    <li><a href="#" className="hover:underline">My Best Buy Memberships</a></li>
                                    <li><a href="#" className="hover:underline">View Points & Certificates</a></li>
                                    <li><a href="#" className="hover:underline capitalize">member offer</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Group 3 */}
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-semibold text-black mb-4 border-b md:border-none pb-2 md:pb-0">Partnerships</h4>
                                <ul className="text-[12px] space-y-2">
                                    <li><a href="#" className="hover:underline">Sell on Best Buy Marketplace</a></li>
                                    <li><a href="#" className="hover:underline">Advertise with Us</a></li>
                                    <li><a href="#" className="hover:underline">Affiliates: Creators & Publishers</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-black mb-4 border-b md:border-none pb-2 md:pb-0">About Us</h4>
                                <ul className="text-[12px] space-y-2">
                                    <li><a href="#" className="hover:underline">Corporate Information</a></li>
                                    <li><a href="#" className="hover:underline">Careers</a></li>
                                    <li><a href="#" className="hover:underline">In the Community</a></li>
                                    <li><a href="#" className="hover:underline">Newsroom</a></li>
                                    <li><a href="#" className="hover:underline">Our Commitment to the Environment</a></li>
                                    <li><a href="#" className="hover:underline">Best Buy US</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="right_side_bar bg-white p-6 rounded-sm shadow-sm h-full border lg:border-none border-b-gray-400">
                        <a href="#" className="text-[12px] hover:underline mb-4 block ">Sign in or Create Account</a>
                        <h4 className="font-bold text-black text-[15px] mb-3">Get the latest deals and more.</h4>

                        <form className="flex flex-col sm:flex-row lg:flex-col gap-2 mb-6">
                            <div className="flex justify-between gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    className="flex-1 border border-gray-400 p-2 text-sm rounded-sm outline-none"
                                />
                                <button className="bg-[#0046be] text-white px-6 py-2 text-sm font-bold rounded-sm hover:bg-blue-700 transition-colors">
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#0046be] rounded flex items-center justify-center text-white font-bold italic text-xl">B</div>
                            <div>
                                <p className="text-black font-bold text-sm">Best Buy app</p>
                                <a href="#" className="text-xs text-blue-600 hover:underline">Learn more ›</a>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-blue-500 text-2xl p-4 border-t border-gray-300 border-b border-gray-300">
                            <span className="cursor-pointer hover:text-blue-600"><TiSocialFacebook /></span>
                            <span className="cursor-pointer hover:text-blue-600"><SlSocialInstagram /></span>
                            <span className="cursor-pointer hover:text-blue-600"><SlSocialLinkedin /></span>
                            <span className="cursor-pointer hover:text-blue-600"><SlSocialPintarest /></span>
                            <span className="cursor-pointer hover:text-blue-600"><TiSocialTwitter /></span>
                            <span className="cursor-pointer hover:text-blue-600"><TiSocialYoutube /></span>
                        </div>
                    </div>
                </div>

                <div className="footer_bottom mx-auto px-4 mt-12">
                    <div className="flex justify-between gap-4">
                        <p>How was your experience? <a href="#" className="hover:underline font-medium"> Give feedback about our website</a></p>
                        <div className="gap-4">
                            <a href="#" className="hover:underline">Mobile Site</a>
                            <a href="#" className="hover:underline">Best Buy Canada</a>
                        </div>
                    </div>


                    <div className="flex flex-wrap gap-x-3 gap-y-2 text-[11px] border-t border-gray-300  text-blue-500 pt-4">
                        {["Accessibility", "Terms & Conditions", "Privacy", "Interest-Based Ads", "State Privacy Rights", "CA Supply Chain Transparency Act"].map((link) => (
                            <a key={link} href="#" className="hover:underline after:content-['|'] after:ml-3 last:after:content-none">{link}</a>
                        ))}
                        <p className="w-full mt-4 md:w-auto md:mt-0 md:ml-auto">© 2026 Best Buy. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;