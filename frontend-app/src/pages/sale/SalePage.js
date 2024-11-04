import ProductSelector from "../../components/products/ProductSelector";
import { useNavigate } from 'react-router-dom';
import MainLayout from "../../components/layout/Layout";
function SalePage() {
    const navigate = useNavigate();
    const confirmAction = (selectedProducts) => {
        // MOCK: new order
        navigate('/orders/status/1'); // put id here
    }
    return (
        <MainLayout>
            <ProductSelector confirmAction={confirmAction} theme={"green"} />
        </MainLayout>
    )
}
export default SalePage