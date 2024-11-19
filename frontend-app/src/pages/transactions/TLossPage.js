import {useParams} from "react-router-dom";
import MainLayout from "../../components/layout/Layout";
import {ViewLossComponent} from "../../components/transactions/concrete/ViewLossComponent";

export default function TLossPage() {
    const {id} = useParams()
    return (
        <MainLayout>
            <ViewLossComponent itemId={id} />
        </MainLayout>
    )
}