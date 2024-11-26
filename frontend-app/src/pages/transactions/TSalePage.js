import {useParams} from "react-router-dom";
import MainLayout from "../../components/layout/Layout";
import {ViewSaleComponent} from "../../components/transactions/concrete/ViewSaleComponent";
import {AuthOnly} from "../../components/auth/restrict/AuthOnly";

export default function TSalePage() {
    const {id} = useParams()
    return (
        <MainLayout>
            <AuthOnly>
                <ViewSaleComponent itemId={id} />
            </AuthOnly>
        </MainLayout>
    )
}