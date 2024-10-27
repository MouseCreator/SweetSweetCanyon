import ProductSelector from "../../components/products/ProductSelector";
import { useNavigate } from 'react-router-dom';
function SalePage() {
    const navigate = useNavigate();
    const confirmAction = (selectedProducts) => {
        // MOCK: new order
        navigate('/orders/status/1'); // put id here
    }
    return (
        <ProductSelector confirmAction={confirmAction} />
    )
}
export default SalePage