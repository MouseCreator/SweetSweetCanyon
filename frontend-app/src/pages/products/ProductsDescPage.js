import MainLayout from "../../components/layout/Layout";
import {ProductDescription} from "../../components/products/desc/ProductDescription";
import {useParams} from "react-router-dom";

export default function ProductsPage() {
    const { id } = useParams();
    return (
        <MainLayout>
            <ProductDescription productId={id} role={"admin"} />
        </MainLayout>
    )
}