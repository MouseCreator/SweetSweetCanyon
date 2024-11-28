import ProductSelector from "../../components/products/ProductSelector";
import { useNavigate } from 'react-router-dom';
import MainLayout from "../../components/layout/Layout";
import {OverlayBase} from "../../components/overlay/OverlayBase";
import {SaleOverlayContent} from "../../components/products/sale/SaleOverlayContent";
import {useState} from "react";
import {postSale} from "../../connect/connectTransactions";
import {useHighLevel} from "../../components/auth/context/HighLevelAuthContext";

function SalePage() {
    const navigate = useNavigate();
    const [isOverlayActive, setIsOverlayActive] = useState(false);
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState(null)
    const { token } = useHighLevel()
    const confirmAction = (selectedProducts) => {
        setProducts(selectedProducts);
        setIsOverlayActive(true);
    }
    const overlayOnCancel = () => {
        setIsOverlayActive(false);
        setProducts([]);
    }
    const overlayOnPay = () => {
        postSale(products, token).then((r)=>{
            if (r.success) {
                navigate(`/transactions/sales/${r.data.id}`);
            } else {
                if (r.error === 'FORM_ERROR') {
                    setErrors(r.data)
                } else {
                    setErrors({primaryError: r.error, productSpecific: []})
                }
                setIsOverlayActive(false);
            }
        }).catch((r) => {
            setErrors({primaryError: r.message, productSpecific: []})
            setIsOverlayActive(false)
        })

    }
    return (
        <MainLayout>
            <ProductSelector confirmAction={confirmAction} theme={"green"} mode={"sale"} errors={errors} shopId={4} />
            <OverlayBase isActive={isOverlayActive} onClose={overlayOnCancel} >
                <SaleOverlayContent selectedProducts={products} onPay={overlayOnPay} onCancel={overlayOnCancel} />
            </OverlayBase>
        </MainLayout>
    )
}
export default SalePage