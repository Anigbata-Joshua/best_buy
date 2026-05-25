function HeroProps(props) {
    return (
        <div className="flex flex-col relative w-full h-full rounded-2xl overflow-hidden bg-[#003aae] mt-4 p-4">
            <h3 className="text-[32px] font-bold text-white leading-tight">Save up to <br />{props.save}</h3>
            <div className="my-4 shrink-0 h-40 flex items-center justify-center">
                <img src={props.img} alt="" className="max-h-full object-contain" />
            </div>
            <p className="text-sm font-medium text-gray-100 mb-6 grow">{props.desc}</p>
           <div>
             <button className="inline-block bg-white text-black px-4 py-2 cursor-pointer text-center font-bold rounded-sm mt-auto">
                Shop now
            </button>
           </div>
        </div>

    );
};

export default HeroProps;
