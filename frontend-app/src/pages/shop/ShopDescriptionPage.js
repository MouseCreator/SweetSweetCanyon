import MainLayout from "../../components/layout/Layout";
import {ShopDesc} from "../../components/shop/desc/ShopDesc";
import {useParams} from "react-router-dom";

const ShopsPage = () => {
    const { id } = useParams();
    return (
        <MainLayout>
            <div className={""}>
                <ShopDesc shopId={id} role={'admin'} />
            </div>
        </MainLayout>
    )
}

export default ShopsPage