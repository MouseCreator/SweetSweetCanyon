import MainLayout from "../../components/layout/Layout";
import {ShopDesc} from "../../components/shop/desc/ShopDesc";
import {useParams} from "react-router-dom";
import {useHighLevel} from "../../components/auth/context/HighLevelAuthContext";

const ShopsPage = () => {
    const { id } = useParams();
    const { role, shop } = useHighLevel()
    return (
        <MainLayout>
            <div className={""}>
                <ShopDesc shopId={id} role={ role } userShop = { shop } />
            </div>
        </MainLayout>
    )
}

export default ShopsPage