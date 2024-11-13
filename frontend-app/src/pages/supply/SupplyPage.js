import ProductSelector from "../../components/products/ProductSelector";
import { useNavigate } from 'react-router-dom';
import SupplierList from "../../components/products/supply/SupplierList";
import {useState} from "react";
import MainLayout from "../../components/layout/Layout";
import {OverlayBase} from "../../components/overlay/OverlayBase";
import {SupplyOverlayContent} from "../../components/products/supply/SupplyOverlayContent";
import "./../../static_controls/content.css"

function SupplyPage() {
    const navigate = useNavigate();
    const [isOverlayActive, setIsOverlayActive] = useState(false);
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState(null);

    const [supplierId, setSupplierId] = useState(-1);
    const [supplierName, setSupplierName] = useState('');
    const [supplierError, setSupplierError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const validateData = () => {
        let success = true;
        if (supplierId < 0) {
            setSupplierError(true);
            success = false;
        } else if (supplierError) {
            setSupplierError(false);
        }
        if (supplierName.trim() === "") {
            setNameError(true);
            success = false;
        } else if (nameError) {
            setNameError(false);
        }
        return success;
    }
    const confirmAction = (selectedProducts) => {
        const success = validateData();
        if (!success) {
            return;
        }
        setProducts(selectedProducts);
        setIsOverlayActive(true);
    }
    const overlayOnCancel = () => {
        setIsOverlayActive(false);
        setProducts([]);
    }
    const overlayOnPay = () => {
        navigate('/deliveries/1');
    }


    return (
        <MainLayout>
            <div className={"static-content"}>
                <ProductSelector confirmAction={confirmAction} theme={"blue"} mode={"supply"} errors={errors} shopId={1}>
                    <SupplierList onSelectSupplier={setSupplierId} onTypeName={setSupplierName}
                    supplierError={supplierError} nameError={nameError} />
                </ProductSelector>
                <OverlayBase isActive={isOverlayActive} onClose={overlayOnCancel} >
                    <SupplyOverlayContent selectedProducts={products} onPay={overlayOnPay} onCancel={overlayOnCancel} />
                </OverlayBase>
            </div>
        </MainLayout>
    )
}
export default SupplyPage