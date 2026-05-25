import bed from "../../assets/images/Homepage_img/bedroom.webp"
import kitchen from "../../assets/images/Homepage_img/kitchen.jpg"
import office from "../../assets/images/Homepage_img/office.jpg"
import coat from "../../assets/images/Homepage_img/coat.jpg";
import patio from "../../assets/images/Homepage_img/patio.jpg"
import outdoor from "../../assets/images/Homepage_img/outdoor.jpg"
import umbrella from "../../assets/images/Homepage_img/umbralla.jpg";
import outdoor2 from "../../assets/images/Homepage_img/outdoor2.jpg"
function Section7() {
    return (
        <div>
            <section className="px-4 mt-12">
                <div className="flex flex-col lg:flex-row mx-auto gap-6  w-full lg:w-[75%]">

                    <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 hover:underline">Organize your space</h3>

                        <div className="grid grid-cols-2 ">
                            <div className="group cursor-pointer">
                                <div className="p-4 mb-2 overflow-hidden">
                                    <img src={bed} alt="Bathroom" className="w-full h-full rounded-xl object-contain" />
                                    <p className="text-[14px] font-bold mt-2 text-gray-700 hover:underline">Bathroom and laundry</p>
                                </div>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="rounded-xl p-4 mb-2 overflow-hidden">
                                    <img src={kitchen} alt="Kitchen" className="w-full rounded-xl object-contain" />
                                    <p className="text-[14px] font-bold mt-2 text-gray-700 hover:underline">Kitchen storage</p>
                                </div>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="rounded-xl p-4 mb-2 overflow-hidden">
                                    <img src={office} alt="Office" className="w-full rounded-xl object-contain" />
                                    <p className="text-[14px] font-bold mt-2 text-black hover:underline">Office storage</p>
                                </div>
                            </div>
                            <div className="group cursor-pointer">
                                <div className="rounded-xl p-4 overflow-hidden">
                                    <img src={coat} alt="Coat racks" className="w-full rounded-xl object-contain" />
                                    <p className="text-[14px] font-bold mt-2 text-black hover:underline">Coat racks</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Transform your outdoor dining at home</h3>

                        <div className="grid grid-cols-2">
                            <div className="group cursor-pointer">
                                <div className="rounded-xl p-4 mb-2 overflow-hidden">
                                    <img src={patio} alt="Patio" className="w-full rounded-xl object-contain" />
                                    <p className="text-[14px] font-bold mt-2 text-black hover:underline">Patio chairs & furniture</p>
                                </div>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="rounded-xl p-4 mb-2 overflow-hidden">
                                    <img src={outdoor} alt="Lighting" className="w-full rounded-xl object-contain" />
                                    <p className="text-[14px] font-bold mt-2 text-black hover:underline">Outdoor lighting</p>
                                </div>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="rounded-xl p-4 mb-2 overflow-hidden">
                                    <img src={umbrella} alt="Umbrella" className="w-full rounded-xl object-contain" />
                                    <p className="text-[14px] font-bold mt-2 text-black hover:underline">Patio umbrellas & bases</p>
                                </div>
                            </div>
                            <div className="group cursor-pointer">
                                <div className="rounded-xl p-4 mb-2 overflow-hidden">
                                    <img src={outdoor2} alt="Heating" className="w-full h-full rounded-xl object-contain" />
                                    <p className="text-[14px] font-bold text-black hover:underline">Outdoor heating</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
export default Section7;