import {useParams} from "react-router-dom";
import MainLayout from "../../components/layout/Layout";
import {ViewMoveComponent} from "../../components/transactions/concrete/ViewMoveComponent";

export default function TMovePage() {
    const {id} = useParams()
    return (
        <MainLayout>
            <ViewMoveComponent itemId={id} />
        </MainLayout>
    )
}