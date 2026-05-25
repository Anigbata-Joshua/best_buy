
function Section1() {
    return (
        <div>
            <section className="bg-gradient-to-r from-[#0046BE] to-[#009FBD] flex justify-center items-center gap-10 mt-6 w-[75%] mx-auto py-15  border-t-neutral-50 rounded-t-2xl">
                <div className="flex flex-col">
                    <h2 className="text-[#FFF200] text-[80px] uppercase leading-tight">
                        Top <span className="font-bold">Deal</span>
                    </h2>
                    <p className="text-[24px] font-light text-white">
                        Got your check? Get your tech.
                    </p>
                </div>
                <button className="bg-white text-[#0046BE] px-4 py-2 rounded-sm cursor-pointer font-bold hover:bg-gray-100 transition-colors">
                    Shop Now
                </button>
            </section>
        </div>
    )
}
export default Section1;