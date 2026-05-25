import { useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

function Card(props) {
    const [liked, setLiked] = useState(false);
    const toggleLike = (e) => {
        e.preventDefault();
        setLiked(!liked);
    };
    

    return (
        <div className="flex flex-col group">
            <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}} />
            <div className="relative p-4 w-full flex justify-center mb-3 min-h-70 bg-gray-100 overflow-hidden ">
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10 cursor-pointer">Save ${props.promo}</span>
                <button onClick={toggleLike} className="absolute top-2 right-2 cursor-pointer">
                    {liked ? (
                        <MdFavorite className="text-blue-600 text-xl cursor-pointer"/>
                    ) : (
                        <MdFavoriteBorder className="text-xl text-gray-400 cursor-pointer" />
                    )}
                </button>
                <img src={props.img} alt={props.name} className="h-40 object-contain m-6" />
            </div>
            <h3 className="text-[12px] text-gray-600 leading-snug tracking-wide mt-2 hover:underline cursor-pointer">{props.name}</h3>
            <p className="font-bold">${props.price}</p>
            <p className="text-gray-400 line-through text-sm">${props.oldPrice}</p>
        </div>
    );
}
export default Card;
