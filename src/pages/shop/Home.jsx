import { CgProfile } from "react-icons/cg";
import Section1 from "../../components/HopePage_Components/Section1";
import Section2 from "../../components/HopePage_Components/Section2";
import Section4 from "../../components/HopePage_Components/Section4";
import Section5 from "../../components/HopePage_Components/Section5";
import Section6 from "../../components/HopePage_Components/Section6";
import Section7 from "../../components/HopePage_Components/Section7";
import Section8 from "../../components/HopePage_Components/Section8";
import visa from "../../assets/images/Homepage_img/visa.jpg";
import conponent from "../../assets/images/Homepage_img/component.png";
import { Link } from "react-router-dom";
function Home() {

    return (
        <div className="">
            <Section1 />
            <Section2 />

            {/* section3 */}
            <section className="px-4">
                <div className="w-[75%] flex flex-col md:flex-row mx-auto mt-3 bg-gray-100 justify-between p-6 md:p-8 border border-gray-300 rounded-xl shadow-sm gap-4">
                    <div className="flex items-start md:items-center gap-3">
                        <CgProfile className="mt-1 text-2xl shrink-0" />
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                            <p className="text-lg md:text-xl">
                                Sign in for free shipping*, recommendations, easy order tracking and more
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-gray-500 text-sm whitespace-nowrap">*Exclusions apply.</p>
                                <span className="hover:underline text-blue-600 cursor-pointer whitespace-nowrap">Learn more</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                      <Link to="/loginUser">
                        <button className="bg-[#0072DE] text-white py-2 px-6 rounded-lg cursor-pointer w-full md:w-auto font-semibold">
                            Sign in
                        </button>
                      </Link>
                      <Link to="/signup">
                        <button className="bg-transparent text-black border border-black py-2 px-5 rounded-lg cursor-pointer w-full md:w-auto font-bold">
                            Create account
                        </button>
                      </Link>
                    </div>
                </div>
            </section>

            <Section4 />

            <Section5 />

            <Section6 />
            <Section7 />

            <section className="px-4 mt-6">
                <div className="w-full lg:w-[75%] mx-auto bg-[#0046BE] border-gray-200 rounded-2xl p-6 md:p-10">

                    <div className="flex flex-col lg:flex-row justify-between items-center gap-3 lg:gap-10">
                        <div className="shrink-0">
                            <img src={visa} alt="debit_card" className="w-40 md:w-56 lg:w-64 xl:w-72 object-contain cursor-pointer" />
                        </div>
                        <div className="text-center lg:text-left flex-1">
                            <h4 className="text-3xl md:text-[40px] font-bold text-white leading-tight">12 months financing</h4>
                            <p className="text-gray-100 mt-2 text-sm tracking-wider">on storewide purchases totaling $299 and counting</p>
                        </div>
                        <div className="w-full lg:w-auto">
                            <button className="w-full lg:w-auto bg-white border border-gray-700 text-black font-bold text-sm px-12 py-3 rounded-xl cursor-pointer">Learn more</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 mt-6">
                <div className="w-full lg:w-[75%] mx-auto bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row items-start justify-between gap-6">

                        <div className="shrink-0 mx-auto lg:mx-0">
                            <img src={conponent} alt="Brand Icon" className="w-40 md:w-50 lg:w-40 object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[18px] md:text-base mb-2 cursor-pointer  text-gray-900">More for your money</h3>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed hover:underline">Enjoy everything from financing and price match to trade-in and member perks</p>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[18px] md:text-base mb-2 cursor-pointer  text-gray-900">Support and service that have your ba</h3>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed hover:underline">Includes setups, installation,<br /> protection and repair</p>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[18px] md:text-base mb-2 cursor-pointer  text-gray-900">Same-day pickup or fast, free delive</h3>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed hover:underline">Get your tech on your terms</p>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[18px] md:text-base mb-2 cursor-pointer text-gray-900">Endless selection, easy to sh</h3>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed hover:underline">From the basic essentials to premium tech, it's easy to find what fits you</p>
                        </div>
                    </div>
                </div>
            </section>

            <Section8 />

        </div>
    )
}
export default Home;

