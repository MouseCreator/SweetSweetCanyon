import MainLayout from "../../components/layout/Layout";
import {ProductSimpleListing} from "../../components/products/ProductSimpleListing";
import {ProductsHeader} from "../../components/products/header/ProductsHeader";

export default function ProductsPage() {
    return (
        <MainLayout>
            <ProductsHeader isAdmin={true} />
            <ProductSimpleListing />
        </MainLayout>
    )
}