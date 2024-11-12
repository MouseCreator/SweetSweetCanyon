
import MainLayout from "../../components/layout/Layout";
import {useParams} from "react-router-dom";
import {StorageManagement} from "../../components/storage/StorageManagement";

const ShopStoreManager = () => {
    const {id} = useParams()
        return (
    <MainLayout>
        <StorageManagement shopId={id} />
    </MainLayout>
        )
}
export default ShopStoreManager