import MainLayout from "../../components/layout/Layout";
import {ShopHeader} from "../../components/shop/header/ShopHeader";
import {ShopSimpleListing} from "../../components/shop/ShopSimpleListing";
import {useHighLevel} from "../../components/auth/context/HighLevelAuthContext";

const ShopsPage = () => {

    const { role } = useHighLevel()
    const isAdmin = role === 'admin'

    return (
        <MainLayout>
            <div className={""}>
                <ShopHeader isAdmin={isAdmin} />
                <ShopSimpleListing />
            </div>
        </MainLayout>
    )
}

export default ShopsPage