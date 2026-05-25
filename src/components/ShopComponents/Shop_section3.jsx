import od1 from "../../assets/images/ShopPage_img/od1.png";
import od2 from "../../assets/images/ShopPage_img/od2.png";
import od3 from "../../assets/images/ShopPage_img/od3.png";
import od4 from "../../assets/images/ShopPage_img/od4.png";
import od5 from "../../assets/images/ShopPage_img/od5.png";
import od6 from "../../assets/images/ShopPage_img/od6.png";
import od8 from "../../assets/images/ShopPage_img/od8.png";
import HeroProps from "../ShopComponents/HeroProps";
import { useState } from "react";


function Shop_section3() {
    return (
        <div>
            <section className="px-4 mt-6">
                <div className="w-full md:w-[75%] mx-auto bg-gradient-to-r from-[#0046BE] to-[#009FBD] rounded-t-2xl p-6 shadow-lg">
                    <h2 className="text-[32px] font-bold text-white">Featured deals</h2>
                </div>
                    <div className="section_grid bg-gray-200 w-full md:w-[75%] mx-auto rounded-b-2xl pb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 justify-center p-4">
                            <div className="flex flex-col relative w-full h-full rounded-2xl overflow-hidden bg-[#003aae] mt-4 p-4 shadow-md">
                                <HeroProps save="50%" img={od1} desc="Save $100 or $150 on Xbox console with recycle" />
                            </div>
                            <div className="flex flex-col relative w-full h-full rounded-2xl overflow-hidden bg-[#003aae] mt-4 p-4 shadow-md">
                                <HeroProps save="$600" img={od2} desc="Up to $2,095 in trade-in for qualifying tech" />
                            </div>
                            <div className="flex flex-col relative w-full h-full rounded-2xl overflow-hidden bg-[#003aae] mt-4 p-4 shadow-md">
                                <HeroProps save="$600" img={od3} desc="Save up to $750 on select Google Pixel 10 Series with qualifying trade-in" />
                            </div>
                            <div className="flex flex-col relative w-full h-full rounded-2xl overflow-hidden bg-[#003aae] mt-4 p-4 shadow-md">
                                <HeroProps save="$150" img={od4} desc="Save up to $300 on Samsung Galaxy Watch8 Classic or Galaxy Watch Ultra (2025) with qualifying trade-in" />
                            </div>
                            <div className="flex flex-col relative w-full h-full rounded-2xl overflow-hidden bg-[#003aae] mt-4 p-4 shadow-md">
                                <HeroProps save="50%" img={od5} desc="Save up to $500 on an iPad with qualifying iPad trade-in" />
                            </div>
                            <div className="flex flex-col relative w-full h-full rounded-2xl overflow-hidden bg-[#003aae] mt-4 p-4 shadow-md">
                                <HeroProps save="$600" img={od6} desc="Extra $150 trade-in value when you trade in a qualifying Mac laptop and buy an M5 Series MacBook Air or MacBook Pro" />
                            </div>
                            <div className="flex flex-col relative w-full h-full rounded-2xl overflow-hidden bg-[#003aae] mt-4 p-4 shadow-md">
                                <HeroProps save="$600" img={od4} desc="iPhone 17 Pro Save up to $1,100 with qualified activation and trade-in" />
                            </div>
                            <div className="flex flex-col relative w-full h-full rounded-2xl overflow-hidden bg-[#003aae] mt-4 p-4 shadow-md">
                                <HeroProps save="$150" img={od8} desc="Apple Watch Series 11Save $100 on select models Also, save up to an additional $160 with" />
                            </div>
                        </div>

                    </div>

                {/* </Link> */}
            </section>
        </div>
    )
}
export default Shop_section3;
