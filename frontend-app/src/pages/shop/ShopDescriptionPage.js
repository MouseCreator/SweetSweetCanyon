import MainLayout from "../../components/layout/Layout";
import {ShopDesc} from "../../components/shop/desc/ShopDesc";

const ShopsPage = () => {
    return (
        <MainLayout>
            <div className={""}>
                <ShopDesc shopId={1} isAdmin={true} />
            </div>
        </MainLayout>
    )
}

export default ShopsPage