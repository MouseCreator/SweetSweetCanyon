import {useParams} from "react-router-dom";
import {ViewSupplyComponent} from "../../components/transactions/concrete/ViewSupplyComponent";
import MainLayout from "../../components/layout/Layout";

export default function TSupplyPage() {
    const {id} = useParams()
    return (
        <MainLayout>
            <ViewSupplyComponent itemId={id} />
        </MainLayout>
    )
}