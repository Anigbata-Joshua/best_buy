
function Section1() {
    return (
     <div>
    <section className="bg-gradient-to-r from-[#0046BE] to-[#009FBD] flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-14 mt-6 w-[75%] mx-auto p-8 sm:p-12 lg:py-14 lg:px-16 border-t border-t-neutral-50 rounded-2xl lg:rounded-t-2xl shadow-sm text-center lg:text-left">
        <div className="flex flex-col">
            <h2 className="text-[#FFF200] text-4xl sm:text-6xl md:text-7xl lg:text-[80px] uppercase leading-none tracking-tight">
                Top <span className="font-bold">Deal</span>
            </h2>
            <p className="text-base sm:text-xl lg:text-[24px] font-light text-white mt-2 max-w-sm sm:max-w-none">
                Got your check? Get your tech.
            </p>
        </div>
        <button className="bg-white text-[#0046BE] px-6 py-3 lg:px-5 lg:py-2.5 rounded font-bold hover:bg-gray-100 active:scale-95 transition-all cursor-pointer text-sm sm:text-base shadow-md w-full sm:w-auto shrink-0">
            Shop Now
        </button>
        
    </section>
</div>
    )
}
export default Section1;