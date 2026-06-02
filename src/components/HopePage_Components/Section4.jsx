import { useState } from "react";
import extra from "../../assets/images/Homepage_img/extra.png";

import tv from "../../assets/images/Homepage_img/tv.png";
import {
    MdHistory,
    MdOutlineShoppingCart,
    MdFavoriteBorder,
    MdFavorite,

} from "react-icons/md";

function Section4() {
    const [liked, setLiked] = useState(false);
    const toggleLike = () => {
        setLiked(!liked)

    }

    return (
        <div>
            <section className="w-full px-4 mt-8">
                <div className="w-[75%] lg:w-[75%] mx-auto flex flex-col lg:flex-row gap-6">
                    <div className="img_div w-full lg:w-2/3 ">
                        <img src={extra} alt="MacBook" className=" object-contain rounded-2xl cursor-pointer" />
                    </div>
                    <div className="container w-full lg:w-1/3 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Continue shopping for</h3>
                            <button className="text-blue-600 text-sm font-semibold hover:underline">See more</button>
                        </div>
                        <div className="flex gap-2 mb-6">
                            <button className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 cursor-pointer">
                                <MdHistory className="text-lg" /> Recently viewed
                            </button>
                            <button className="flex items-center gap-2 border border-gray-300 text-gray-600 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-gray-50 cursor-pointer">
                                <MdOutlineShoppingCart className="text-lg" /> In your cart
                            </button>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="relative bg-gray-50 rounded-lg p-4 w-full flex justify-center mb-3">
                                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">Save $500</span>
                                {/* toggle effect */}
                                <button onClick={toggleLike} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 ">
                                    {liked ?
                                        <MdFavorite className="text-blue-600 text-xl cursor-pointer " />
                                        :
                                        < MdFavoriteBorder className="text-xl cursor-pointer" />
                                    }
                                </button>
                                <img src={tv} alt="LG TV" className="h-40 object-contain" />
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-2 mb-1">
                                LG - 77" Class B3 Series OLED 4K UHD Smart webOS TV
                            </p>
                            <p className="text-xs font-bold text-blue-700 mb-1">Ultimate Deal</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg font-bold text-gray-900">$1,499.99</span>
                                <span className="text-sm text-gray-400 line-through">$2,499.99</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
export default Section4;