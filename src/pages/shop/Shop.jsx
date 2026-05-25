import ShopSection1 from "../../components/ShopComponents/Shop_section1";
import Shop_section3 from "../../components/ShopComponents/Shop_section3";
import ProductGrid from "../../components/ProductGrid";


function Shop_page() {
    return (
        <div>
            <ShopSection1 />
            <ProductGrid/>
            <Shop_section3 />
        </div>
    )
}
export default Shop_page;