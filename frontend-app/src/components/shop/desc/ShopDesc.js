import "./../../common/desc/common-info.css"
import "./../../../static_controls/loading.css"
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {OverlayBase} from "../../overlay/OverlayBase";
import {ShopImage} from "../image/ShopImage";
import "./shop-desc.css"
import DeleteShopOverlay from "../overlay/DeleteShopOverlay";
import {deleteShopById, getShopById} from "../../../connect/connectShops";
import {usePopup} from "../../common/popup/PopupContext";
import {useHighLevel} from "../../auth/context/HighLevelAuthContext";
export function ShopDesc({shopId, role, userShop}) {
    const [shopById, setShopById] = useState(null)
    const [loadingState, setLoadingState] = useState(true);
    const [error, setError] = useState('')
    const [overlayActive, setOverlayActive] = useState(false)
    const navigate = useNavigate()
    const { token } = useHighLevel()
    const ush = userShop === null ? null : `${userShop}`

    useEffect(()=> {
        getShopById(shopId).then((r)=>{
            if (!r.success) {
                setError(r.error)
            } else {
                setShopById(r.data);
            }
            setLoadingState(false)
        });
    }, [shopId])
    const {invokePopup} = usePopup();
    const onClose = () => {
        setOverlayActive(false);
    }
    const onDelete = () => {
        deleteShopById(shopId, token).then((r) => {
            if (r.success) {
                navigate('/shops/');
                invokePopup('Shop is deleted successfully', 'green')
            } else {
                invokePopup('An error occurred while deleting the shop')
                setOverlayActive(false);
            }
        }).catch(()=>{
            invokePopup('An error occurred while deleting the shop')
            setOverlayActive(false);
        })

    }
    const onEdit = () => {
        navigate(`/shops/${shopId}/edit`)
    }
    const onOther = () => {
        navigate('/shops/');
    }
    const deletePressed = () => {
        setOverlayActive(true);
    }
    const stocksPressed = () => {
        navigate(`/shops/${shopId}/stock`);
    }
    const managePressed = () => {
        navigate(`/shops/${shopId}/manager`);
    }
    const noProduct = shopById == null;
    if (error !== '') {
        return (
            <div className={'load-err'}>
                { error }
            </div>
        )
    }
    if (loadingState) {
        return (<div className={'load-pr'}></div>)
    }
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
                                        { role==='admin' &&
                                            <div className={"cmn-buttons"}>
                                                <button onClick={stocksPressed} className={"gen-button green"}>View stocks</button>
                                                <button onClick={onEdit} className={"gen-button pink"}>Edit shop</button>
                                                <button onClick={managePressed} className={"gen-button pink"}>Manage shop</button>
                                                <button onClick={deletePressed} className={"gen-button red"}>Delete shop</button>
                                            </div>
                                        }
                                        { role==='cashier' && ush === shopId &&
                                            <div className={"cmn-buttons"}>
                                                <button onClick={stocksPressed} className={"gen-button green"}>View stocks</button>
                                                <button onClick={managePressed} className={"gen-button pink"}>Manage shop</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <OverlayBase isActive={overlayActive} onClose={onClose}>
                            <DeleteShopOverlay onDelete={onDelete} onCancel={onClose} onManage={managePressed}/>
                        </OverlayBase>
                    </div>
                )
            }
        </div>
    )
}