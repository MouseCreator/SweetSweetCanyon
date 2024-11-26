import MainLayout from "../../components/layout/Layout";
import {ProductDescription} from "../../components/products/desc/ProductDescription";
import {useParams} from "react-router-dom";
import {useHighLevel} from "../../components/auth/context/HighLevelAuthContext";

export default function ProductsPage() {
    const { id } = useParams();
    const { role } = useHighLevel()
    return (
        <MainLayout>
            <ProductDescription productId={id} role={role} />
        </MainLayout>
    )
}