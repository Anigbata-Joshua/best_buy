import album from "../../assets/images/Homepage_img/album.jpg";
import headphone from "../../assets/images/Homepage_img/headphone.jpg"
import machine from "../../assets/images/Homepage_img/machine.jpg"
import flam2 from "../../assets/images/Homepage_img/flam2.webp"

const Section8 = () => {
    return (
        <div className="w-full lg:w-[75%] mx-auto mt-6 px-4">
            <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-lg min-h-75">
                <div className="lg:w-[40%] bg-[linear-gradient(-45deg,rgb(0,60,175),rgb(112,38,191))] text-white p-10 flex flex-col justify-center">
                    <h2 className="text-[32px] md:text-4xl font-light mb-6 leading-tight">
                        <span className="text-yellow-300">Discover</span> ideas and inspiration for your next adventure.
                    </h2>
                    <button className="bg-white text-black text-[14px] font-bold px-8 py-3 rounded-lg w-fit cursor-pointer">
                        Start exploring
                    </button>
                </div>
                {/* image section */}
                <div className="lg:w-[60%] flex bg-white">
                    {[album, machine, headphone, flam2].map((pic, index) => (
                        <div key={index} className="flex-1 flex items-center justify-center overflow-hidden group">
                            <img src={pic} alt="featured product" className="w-full h-full object-cover cursor-pointer"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Section8;