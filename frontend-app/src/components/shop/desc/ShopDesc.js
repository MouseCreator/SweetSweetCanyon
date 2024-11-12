import "./../../common/desc/common-info.css"
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {OverlayBase} from "../../overlay/OverlayBase";
import DeleteProductOverlay from "../../products/desc/DeleteProductOverlay";
import {ShopImage} from "../image/ShopImage";
import "./shop-desc.css"
export function ShopDesc({shopId, isAdmin}) {
    const shopById =
        {
            id: 1,
            name: "Sweeties",
            address: "Sweet street",
            description: "Our shop, our shop in the middle of our street.",
            workingHours: "9:00-21:00",
            pictureUrl: "https://static.vecteezy.com/system/resources/thumbnails/000/225/642/small_2x/vector-grocery-store-building.jpg"
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
        navigate(`/products/${shopId}/edit`)
    }
    const onOther = () => {
        navigate('/shops/');
    }
    const deletePressed = () => {
        setOverlayActive(true);
    }
    const noProduct = shopById == null;
    return (
        <div className={"w-full"}>
            {
                noProduct ? (
                    <div className={"flex flex-row justify-center"}>
                        <h1 className={"cmn-title"}>The shop doesn't exist</h1>
                    </div>
                ) : (
                    <div className={"flex flex-row justify-center w-full"}>
                        <div className={"cmn-center"}>
                            <h1 className={"cmn-title"}>{shopById.name}</h1>
                            <p className={"location-hint"}>
                                <span className={"location-link"} onClick={onOther}>Shops</span>/</p>
                            <div className={"flex flex-col items-center"}>
                                <ShopImage pictureUrl={shopById.pictureUrl} size={"s-large"} />
                                <div className={"pb-5"} />
                                <div className={"mx-4 shop-desc-content"}>
                                    <div className={"cmn-important-line"}>Name: {(shopById.name)}</div>
                                    <div className={"cmn-important-line"}>Address: {(shopById.address)}</div>
                                    <div className={"cmn-important-line mb-4"}>Working Hours: {(shopById.workingHours)}</div>
                                    <p className={"text-xl mb-4 text-wrap"}>{shopById.description}</p>
                                    <div className={"cmn-buttons"}>
                                        <button onClick={onOther} className={"gen-button"}>Other shops</button>
                                        { isAdmin &&
                                            <div className={"cmn-buttons"}>
                                                <button onClick={onEdit} className={"gen-button pink"}>Edit shop</button>
                                                <button onClick={deletePressed} className={"gen-button red"}>Delete shop</button>
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