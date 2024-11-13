
import {useParams} from "react-router-dom";
import ShopStock from "../../components/shop/stock/ShopStock";
import MainLayout from "../../components/layout/Layout";

export default function ShopStockPage() {
    const { id } = useParams();
    return (
        <MainLayout>
            <ShopStock shopId={id} />
        </MainLayout>
    )
}