import ProductSelector from "../../components/products/ProductSelector";
import { useNavigate } from 'react-router-dom';
import MainLayout from "../../components/layout/Layout";
import {OverlayBase} from "../../components/overlay/OverlayBase";
import {SaleOverlayContent} from "../../components/products/sale/SaleOverlayContent";
import {useState} from "react";
function SalePage() {
    const navigate = useNavigate();
    const [isOverlayActive, setIsOverlayActive] = useState(false);
    const [products, setProducts] = useState([])
    const confirmAction = (selectedProducts) => {
        setProducts(selectedProducts);
        setIsOverlayActive(true);
    }
    const overlayOnCancel = () => {
        setIsOverlayActive(false);
        setProducts([]);
    }
    const overlayOnPay = () => {
        navigate('/orders/status/1');
    }

    return (

        <MainLayout>
            <ProductSelector confirmAction={confirmAction} theme={"green"} mode={"sale"} />
            <OverlayBase isActive={isOverlayActive} onClose={overlayOnCancel} >
                <SaleOverlayContent selectedProducts={products} onPay={overlayOnPay} onCancel={overlayOnCancel} />
            </OverlayBase>
        </MainLayout>
    )
}
export default SalePage