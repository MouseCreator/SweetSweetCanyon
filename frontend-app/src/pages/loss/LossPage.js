import ProductSelector from "../../components/products/ProductSelector";
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import MainLayout from "../../components/layout/Layout";
import {OverlayBase} from "../../components/overlay/OverlayBase";
import "./../../static_controls/content.css"
import LossReasonList from "../../components/products/loss/LossComponent";
import {LossOverlayContent} from "../../components/products/loss/LossOverlayContent";
import {postLoss} from "../../connect/connectTransactions";
import {useHighLevel} from "../../components/auth/context/HighLevelAuthContext";

function LossPage() {
    const navigate = useNavigate();
    const [isOverlayActive, setIsOverlayActive] = useState(false);
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState(null);

    const [reasonId, setReasonId] = useState(-1);
    const [reasonError, setReasonError] = useState(false);

    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(false);

    const { token } = useHighLevel()
    const validateData = () => {
        let success = true;
        if (reasonId < 0) {
            setReasonError(true);
            success = false;
        } else if (reasonError) {
            setReasonError(false);
        }
        if (comment === undefined) {
            setCommentError(true);
            success = false;
        } else if (commentError) {
            setCommentError(false);
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
    const overlayOnSubmit = () => {
        postLoss({items: products, reasonId: reasonId, comment: comment}, token).then((r)=>{
            if (r.success) {
                navigate(`/transactions/losses/${r.data.id}`);
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
            <div className={"static-content"}>
                <ProductSelector confirmAction={confirmAction} theme={"orange"} mode={"loss"} errors={errors} shopId={4}>
                    <LossReasonList onSelectReason={setReasonId} onTypeComment={setComment}
                                  reasonError={reasonError} commentError={commentError}/>
                </ProductSelector>
                <OverlayBase isActive={isOverlayActive} onClose={overlayOnCancel} >
                    <LossOverlayContent selectedProducts={products} onLoss={overlayOnSubmit}onCancel={overlayOnCancel} />
                </OverlayBase>
            </div>
        </MainLayout>
    )
}
export default LossPage