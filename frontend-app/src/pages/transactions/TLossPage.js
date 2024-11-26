import {useParams} from "react-router-dom";
import MainLayout from "../../components/layout/Layout";
import {ViewLossComponent} from "../../components/transactions/concrete/ViewLossComponent";
import {AuthOnly} from "../../components/auth/restrict/AuthOnly";

export default function TLossPage() {
    const {id} = useParams()
    return (
        <MainLayout>
            <AuthOnly>
                <ViewLossComponent itemId={id} />
            </AuthOnly>
        </MainLayout>
    )
}