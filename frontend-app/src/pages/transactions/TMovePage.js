import {useParams} from "react-router-dom";
import MainLayout from "../../components/layout/Layout";
import {ViewMoveComponent} from "../../components/transactions/concrete/ViewMoveComponent";
import {AuthOnly} from "../../components/auth/restrict/AuthOnly";

export default function TMovePage() {
    const {id} = useParams()
    return (
        <MainLayout>
                <AuthOnly>
                        <ViewMoveComponent itemId={id} />
                </AuthOnly>
        </MainLayout>
    )
}