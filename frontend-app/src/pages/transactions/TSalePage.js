import {useParams} from "react-router-dom";
import MainLayout from "../../components/layout/Layout";
import {ViewSaleComponent} from "../../components/transactions/concrete/ViewSaleComponent";

export default function TSalePage() {
    const {id} = useParams()
    return (
        <MainLayout>
            <ViewSaleComponent itemId={id} />
        </MainLayout>
    )
}