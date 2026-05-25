import Card from "./Card";
import tv2 from "../../assets/images/Homepage_img/tv2.webp";
import tv3 from "../../assets/images/Homepage_img/lenovo.webp";
import tv4 from "../../assets/images/Homepage_img/tcl.webp";
import teli from "../../assets/images/Homepage_img/tv3.webp";
import tv from "../../assets/images/Homepage_img/tv.png";
import leno2 from "../../assets/images/Homepage_img/leno2.jpg";
import fanatics from "../../assets/images/Homepage_img/fanatics.jpg";
import drink from "../../assets/images/Homepage_img/drink.jpg";
import cfs from "../../assets/images/Homepage_img/cfs.jpg";
import printer from "../../assets/images/Homepage_img/printer.jpg";

function Section6() {

    return (

        <div>

            <section className="w-full mt-8 mb-12">
                <div className="w-[75%] mx-auto relative group">
                    <div className="flex gap-4 bg-white border border-gray-200  rounded-2xl  overflow-x-auto hide-scrollbar ">
                        <div className="min-w-70 sm:min-w-50 snap-start">
                            <Card img={tv} name="Insignia™ - 55' Class F50 Series LED 4K UHD Smart Fire TV" price="209.99" oldPrice="1999" promo="170" />
                        </div>
                        <div className="min-w-70 sm:min-w-50 snap-start">
                            <Card img={leno2} name="MSI - Vector 16 HX AI 16 144Hz FHD+ WUXGA Gaming Laptop " price="1524.00" oldPrice="30000" promo="150" />
                        </div>
                        <div className="min-w-70 sm:min-w-50 snap-start">
                            <Card img={fanatics} name="Fanatics - $100 Gift Card [Digital]" price="85.00" oldPrice="100" promo="15" />
                        </div>
                        <div className="min-w-70 sm:min-w-50 snap-start">
                            <Card img={drink} name="bella PRO - Barista Elite Espresso Drink Station+ - Stainless Steel" price="89.99$89.99" oldPrice="229.99" promo="140" />
                        </div>
                        <div className="min-w-70 sm:min-w-50 snap-start">
                            <Card img={cfs} name="Creality - K2 Plus Printer and CFS Bundle - Space Gray" price="1,099.99" oldPrice="1200.00" promo="120" />
                        </div>
                        <div className="min-w-70 sm:min-w-50 snap-start">
                            <Card img={printer} name="Bambu Lab - X2D AMS Combo 3D Printer - Gray" price="899.99" oldPrice="1230" promo="160" />
                        </div>
                        <div className="min-w-70 sm:min-w-50 snap-start">
                            <Card img={tv2} name="LG - 77 Class C5 Series OLED evo AI 4K UHD Smart webOS TV (2025)" price="1999.99" oldPrice="30000" promo="150" />
                        </div>
                        <div className="min-w-70 sm:min-w-50 snap-start">
                            <Card img={tv3} name="Lenovo - 11 Class C5 Series OLED evo AI 4K UHD Smart webOS TV (2025)" price="299.99" oldPrice="520" promo="150" />
                        </div>
                        <div className="min-w-70 sm:min-w-50 snap-start">
                            <Card img={tv4} name="LG - 77 Class C5 Series OLED evo AI 4K UHD Smart webOS TV (2025)" price="1999.99" oldPrice="30000" promo="150" />
                        </div>
                        <div className="min-w-70 sm:min-w-50 snap-start">
                            <Card img={teli} name="LG - 77 Class C5 Series OLED evo AI 4K UHD Smart webOS TV (2025)" price="1999.99" oldPrice="30000" promo="150" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Section6;