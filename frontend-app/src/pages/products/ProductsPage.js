import MainLayout from "../../components/layout/Layout";
import {ProductSimpleListing} from "../../components/products/ProductSimpleListing";
import {ProductsHeader} from "../../components/products/header/ProductsHeader";
import {useHighLevel} from "../../components/auth/context/HighLevelAuthContext";

export default function ProductsPage() {

    const { role } = useHighLevel()
    const isAdmin = role === 'admin'

    return (
        <MainLayout>
            <ProductsHeader isAdmin={isAdmin} />
            <ProductSimpleListing />
        </MainLayout>
    )
}