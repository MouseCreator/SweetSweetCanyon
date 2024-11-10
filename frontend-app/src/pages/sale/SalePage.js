import ProductSelector from "../../components/products/ProductSelector";
import { useNavigate } from 'react-router-dom';
import MainLayout from "../../components/layout/Layout";
import {OverlayBase} from "../../components/overlay/OverlayBase";
import {SaleOverlayContent} from "../../components/products/sale/SaleOverlayContent";
import {useState} from "react";


const ERRORS = {
    primaryError: "Not all products are in stock",
    productSpecific: [
        {
            id: 1,
            message: "Not enough",
        },
        {
            id: 2,
            message: "Not enough",
        },
    ]
}
function SalePage() {
    const navigate = useNavigate();
    const [isOverlayActive, setIsOverlayActive] = useState(false);
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState(null)
    const confirmAction = (selectedProducts) => {
        setProducts(selectedProducts);
        setIsOverlayActive(true);
    }
    const overlayOnCancel = () => {
        setIsOverlayActive(false);
        setProducts([]);
    }
    const overlayOnPay = () => {
        navigate('/orders/1');
    }


    return (
        <MainLayout>
            <ProductSelector confirmAction={confirmAction} theme={"green"} mode={"sale"} errors={errors} shopId={1} />
            <OverlayBase isActive={isOverlayActive} onClose={overlayOnCancel} >
                <SaleOverlayContent selectedProducts={products} onPay={overlayOnPay} onCancel={overlayOnCancel} />
            </OverlayBase>
        </MainLayout>
    )
}
export default SalePage