import {useParams} from "react-router-dom";
import {ViewSupplyComponent} from "../../components/transactions/concrete/ViewSupplyComponent";
import MainLayout from "../../components/layout/Layout";
import {AuthOnly} from "../../components/auth/restrict/AuthOnly";

export default function TSupplyPage() {
    const {id} = useParams()
    return (
        <MainLayout>
            <AuthOnly>
                <ViewSupplyComponent itemId={id} />
            </AuthOnly>
        </MainLayout>
    )
}