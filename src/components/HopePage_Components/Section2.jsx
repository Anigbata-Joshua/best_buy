
import smartwatch from "../../assets/images/Homepage_img/smartwatch.png"
import phone from "../../assets/images/Homepage_img/phone.png"
import items from "../../assets/images/Homepage_img/carton.png"
import wash from "../../assets/images/Homepage_img/wash.png"
import watch from "../../assets/images/Homepage_img/watch.png"
import workout from "../../assets/images/Homepage_img/workout.png"
import tv from "../../assets/images/Homepage_img/tv.png";
import chair from "../../assets/images/Homepage_img/chair.jpg";
import game from "../../assets/images/Homepage_img/game.jpg";
import monitor from "../../assets/images/Homepage_img/monitor.jpg";
import camera from "../../assets/images/Homepage_img/camera.jpg";
import toys from "../../assets/images/Homepage_img/toys.jpg";

const shop_deal = [
    { id: 2, name: 'Cellphone & Accessories', image: phone },
    { id: 1, name: 'Smart Watch', image: smartwatch },
    { id: 3, name: 'All video Games', image: items },
    { id: 4, name: 'Home Appliance', image: wash },
    { id: 5, name: 'Watches', image: watch },
    { id: 6, name: 'Fitness and Workout', image: workout },
    { id: 7, name: 'Samsung Tv', image: tv },
    { id: 8, name: 'Home Furniture and office', image: chair },
    { id: 9, name: 'Video Games and Virtue Reality', image: game },
    { id: 10, name: 'PC Gaming', image: monitor },
    { id: 11, name: 'Cameras, Camcorders & Drones', image: camera },
    { id: 12, name: 'Toys, Games & Crafts', image: toys }
];

const Section2 = () => {
    return (
        <div>
            {/* FIXED: Swapped max-w-6xl for w-[92%] mobile / md:w-[75%] desktop structure */}
            <section className="w-[92%] md:w-[75%] mx-auto px-4 md:px-10 text-gray-500 border-x border-b border-gray-200 rounded-b-2xl pb-8">

                <h2 className="text-xl md:text-2xl font-bold mb-6 pt-6 text-black tracking-tight">
                    Shop deals by category
                </h2>
                <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory scroll-smooth">
                    {shop_deal.map((category) => (
                        <div
                            key={category.id}
                            className="flex flex-col items-center min-w-[110px] sm:min-w-[150px] md:min-w-[180px] cursor-pointer snap-start group"
                        >
                            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-[#F3F4F6] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-26 md:h-26 object-contain transition-transform duration-300 group-hover:rotate-1"
                                />
                            </div>
                            <p className="text-xs sm:text-sm md:text-base font-semibold mt-3 text-center text-gray-700 transition-colors group-hover:text-blue-600 line-clamp-2 px-1">
                                {category.name}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Section2;