import {ProductImage} from "../ProductImage";
import {Link, useNavigate} from "react-router-dom";
import "./product-description.css"
import {formatPrice} from "../../../utils/date";
import "../../../static_controls/inputs.css";
import "../../themed/themed.css";
import {OverlayBase} from "../../overlay/OverlayBase";
import React, {useState} from "react";
import DeleteProductOverlay from "./DeleteProductOverlay";

export function ProductDescription({productId, isAdmin}) {
    const productById =
     {
            id: 1,
            name: 'Cookie',
            description: 'A tasty cookies with chocolate sprinkles. Baked in an oven and prepared with love. You should definitely try it!',
            price: 10,
            pictureUrl: 'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2700,h_2700,c_limit/chocolate-chip-cookie.jpg'
    }
    const [overlayActive, setOverlayActive] = useState(false)
    const navigate = useNavigate()
    const onClose = () => {
        setOverlayActive(false);
    }
    const onDelete = () => {
        navigate('/products/');
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
    return (
        <div className={"w-full"}>
            {
                noProduct ? (
                    <div className={"flex flex-row justify-center"}>
                        <h1 className={"product-title"}>The product doesn't exist</h1>
                    </div>
                    ) : (
             <div className={"flex flex-row justify-center w-full"}>
                <div className={"product-center"}>
                    <h1 className={"product-title"}>{productById.name}</h1>
                    <div className={"flex flex-row"}>
                        <ProductImage pictureUrl={productById.pictureUrl} size={"s-large"} />
                        <div className={"mx-5 w-1/2"}>
                            <div className={"text-2xl font-bold mb-2"}>Price: {formatPrice(productById.price)}</div>
                            <p className={"text-xl mb-4 text-wrap product-desc-detail"}>{productById.description}</p>
                            <div>
                                <button onClick={onOther} className={"gen-button"}>Other products</button>
                                <button onClick={onEdit} className={"gen-button green"}>Edit product</button>
                                <button onClick={deletePressed} className={"gen-button red"}>Delete product</button>
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