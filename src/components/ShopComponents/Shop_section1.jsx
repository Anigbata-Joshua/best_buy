import { RxTimer } from "react-icons/rx";
function ShopSection1() {
    return (
        <div>
            <section className="px-4 mt-6">
                <div className="w-[75%] mx-auto bg-gradient-to-r from-[#0046BE] to-[#009FBD] rounded-2xl p-6 text-center shadow-lg">
                    <div className="flex flex-col md:flex-row justify-center items-baseline gap-2 mb-2">
                        <h2 className="text-[#FFF200] font-bold text-4xl tracking-tight">
                            ULTIMATE
                        </h2>
                        <span className="text-[#FFF200] font-light text-4xl uppercase">
                            Upgrade sales
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-[24px] font-light text-white">
                            Trade up. Go big. Save bigger.
                        </p>

                        <div className="flex items-center gap-2 px-4 py-1  text-white">
                            <RxTimer className="text-[#FFF200] text"/>
                            <p className="text-sm font-medium tracking-wider rounded-xm bg-yellow-400 text-black py-1 px-2">
                                Ends on Sunday
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default ShopSection1;
