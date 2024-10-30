import ProductSelector from "../../components/products/ProductSelector";
import { useNavigate } from 'react-router-dom';
import SupplierList from "../../components/supply/SupplierList";
import {useState} from "react";
function SupplyPage() {
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState('');
    const [name, setName] = useState('');
    const confirmAction = (selectedProducts) => {
        // MOCK: new order
        navigate('/supplies/status/1'); // put id here
    }
    return (
        <div>
            <SupplierList onSelectSupplier={setSupplier} onTypeName={setName} />
            <ProductSelector confirmAction={confirmAction} />
        </div>
    )
}
export default SupplyPage