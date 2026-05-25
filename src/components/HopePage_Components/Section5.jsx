import tv2 from "../../assets/images/Homepage_img/tv2.webp";
import tv3 from "../../assets/images/Homepage_img/lenovo.webp";
import tv4 from "../../assets/images/Homepage_img/tcl.webp";
import teli from "../../assets/images/Homepage_img/tv3.webp";
import tv from "../../assets/images/Homepage_img/tv.png";
import Card from "./Card"
function Section5(){
    return(
        <div>
            <section className="w-full px-4 mt-8">
                <div className="w-full lg:w-[75%] mx-auto flex flex-col lg:flex-row gap-6 overflow-x-auto hide-scrollbar">
                    <div className="relative group w-full lg:w-2/4 container bg-white border border-gray-200 rounded-2xl p-6">
                        <h3 className="text-[20px] font-bold">Recommended for you <br />
                            <p className="text-[14px] text-gray-500 font-semibold">Inspired by your shopping history</p>
                        </h3>
                        <div className="flex overflow-x-auto gap-4 pb-4">
                            <div className="min-w-70 sm:min-w-[320px] snap-start">
                                <Card img={tv} name="Insignia™ - 55' Class F50 Series LED 4K UHD Smart Fire TV" price="209.99" oldPrice="1999" promo="170" />
                            </div>
                            <div className="min-w-70 sm:min-w-[320px] snap-start">
                                <Card img={tv2} name="LG - 77 Class C5 Series OLED evo AI 4K UHD Smart webOS TV (2025)" price="1999.99" oldPrice="30000" promo="150" />
                            </div>
                            <div className="min-w-70 sm:min-w-[320px] snap-start">
                                <Card img={tv3} name="Lenovo - 11 Class C5 Series OLED evo AI 4K UHD Smart webOS TV (2025)" price="299.99" oldPrice="520" promo="150" />
                            </div>
                            <div className="min-w-70 sm:min-w-[320px] snap-start">
                                <Card img={tv4} name="LG - 77 Class C5 Series OLED evo AI 4K UHD Smart webOS TV (2025)" price="1999.99" oldPrice="30000" promo="150" />
                            </div>
                            <div className="min-w-70 sm:min-w-[320px] snap-start">
                                <Card img={teli} name="LG - 77 Class C5 Series OLED evo AI 4K UHD Smart webOS TV (2025)" price="1999.99" oldPrice="30000" promo="150" />
                            </div>
                        </div>
                    </div>
                    <div className="relative group w-full lg:w-3/4 container bg-white border border-gray-200 rounded-2xl p-6">
                        <h3 className="text-[20px] font-bold">Trending now <br />
                            <p className="text-[14px] text-gray-500 font-semibold">Most viewed product in the last 24 hours</p>
                        </h3>
                        <div className="flex overflow-x-auto gap-4 pb-4 ">
                            <div className="min-w-70 sm:min-w-[320px] snap-start">
                                <Card img={tv} name="Insignia™ - 55' Class F50 Series LED 4K UHD Smart Fire TV" price="209.99" oldPrice="1999" promo="170" />
                            </div>
                            <div className="min-w-70 sm:min-w-[320px] snap-start">
                                <Card img={tv2} name="LG - 77 Class C5 Series OLED evo AI 4K UHD Smart webOS TV (2025)" price="1999.99" oldPrice="30000" promo="150" />
                            </div>
                            <div className="min-w-70 sm:min-w-[320px] snap-start">
                                <Card img={tv3} name="Lenovo - 11 Class C5 Series OLED evo AI 4K UHD Smart webOS TV (2025)" price="299.99" oldPrice="520" promo="150" />
                            </div>
                            <div className="min-w-70 sm:min-w-[320px] snap-start">
                                <Card img={tv4} name="LG - 77 Class C5 Series OLED evo AI 4K UHD Smart webOS TV (2025)" price="1999.99" oldPrice="30000" promo="150" />
                            </div>
                            <div className="min-w-70 sm:min-w-[320px] snap-start">
                                <Card img={teli} name="LG - 77 Class C5 Series OLED evo AI 4K UHD Smart webOS TV (2025)" price="1999.99" oldPrice="30000" promo="150" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
export default Section5;