import MainLayout from "../../components/layout/Layout";
import {ShopHeader} from "../../components/shop/header/ShopHeader";
import {ShopSimpleListing} from "../../components/shop/ShopSimpleListing";

const ShopsPage = () => {
    return (
        <MainLayout>
            <div className={""}>
                <ShopHeader isAdmin={true} />
                <ShopSimpleListing />
            </div>
        </MainLayout>
    )
}

export default ShopsPage