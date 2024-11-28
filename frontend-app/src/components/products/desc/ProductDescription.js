import {ProductImage} from "../ProductImage";
import {useNavigate} from "react-router-dom";
import {formatPrice} from "../../../utils/date";
import "../../../static_controls/inputs.css";
import "../../themed/themed.css";
import {OverlayBase} from "../../overlay/OverlayBase";
import React, {useEffect, useState} from "react";
import DeleteProductOverlay from "./DeleteProductOverlay";
import "../../common/desc/common-info.css"
import {deleteProductById, getProductById} from "../../../connect/connectProducts";
import {GlobalErrorPage} from "../../common/errors/GlobalErrorPage";
import {usePopup} from "../../common/popup/PopupContext";
import {useHighLevel} from "../../auth/context/HighLevelAuthContext";
export function ProductDescription({productId, role}) {
    const [productById, setProductById] = useState(null)
    const [overlayActive, setOverlayActive] = useState(false)
    const navigate = useNavigate()
    const isAuthorized = role === "admin" || role === "cashier"
    const isAdmin = role === "admin"
    const [error, setError] = useState("");
    const { invokePopup } = usePopup();
    const { token } = useHighLevel()
    useEffect(()=> {
        getProductById(productId).then(
            (product) => {
                if (product.success) {
                    setProductById(product.data);
                    setError(null);
                } else {
                    setError('Cannot get product from server');
                }
            }
        ).catch(error=>{setError('Error!')})
    }, [productId]);
    const onClose = () => {
        setOverlayActive(false);
    }

    const onDelete = () => {
        deleteProductById(productId, token).then(
            (p)=>{
                if (p.success) {
                    navigate('/products/');
                } else {
                    invokePopup('Cannot delete product!', 'red')
                }
            }
        )

    }
    const onEdit = () => {
        navigate(`/products/${productId}/edit`)
    }
    const onOther = () => {
        navigate('/products/');
    }
    const deletePressed = () => {
        setOverlayActive(true);
    }
    const noProduct = productById == null;
    if (error !== null) {
        return <GlobalErrorPage text={error} />
    }
    return (
        <div className={"w-full"}>
            {
                noProduct ? (
                    <div className={"flex flex-row justify-center"}>
                        <h1 className={"cmn-title"}>The product doesn't exist</h1>
                    </div>
                    ) : (
             <div className={"flex flex-row justify-center w-full"}>
                <div className={"cmn-center"}>
                    <h1 className={"cmn-title"}>{productById.name}</h1>
                    <p className={"location-hint"}>
                        <span className={"location-link"} onClick={onOther}>Products</span>/</p>
                    <div className={"flex flex-row"}>
                        <ProductImage pictureUrl={productById.pictureUrl} size={"s-large"} />
                        <div className={"mx-5 w-1/2"}>
                            <div className={"text-2xl font-bold mb-2"}>Price: {formatPrice(productById.price)}</div>
                            { isAuthorized && <p className={"mb-2 text-xl"}>Delivery price: {formatPrice(productById.deliveryPrice)}</p>}
                            <p className={"text-xl mb-4 text-wrap cmn-desc-detail"}>{productById.description}</p>
                            <div className={"cmn-buttons"}>
                                <button onClick={onOther} className={"gen-button"}>Other products</button>
                                { isAdmin &&
                                    <div className={"cmn-buttons"}>
                                        <button onClick={onEdit} className={"gen-button pink"}>Edit product</button>
                                        <button onClick={deletePressed} className={"gen-button red"}>Delete product</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <OverlayBase isActive={overlayActive} onClose={onClose}>
                    <DeleteProductOverlay onDelete={onDelete} onCancel={onClose}/>
                </OverlayBase>
            </div>
            )
            }
        </div>
    )
}