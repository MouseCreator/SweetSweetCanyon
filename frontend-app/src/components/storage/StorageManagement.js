import {useCallback, useEffect, useState} from "react";
import {StorageComponent} from "./StorageComponent";
import {sortReasons} from "../../utils/data";
import {useNavigate} from "react-router-dom";
import {StorageMenu} from "./StorageMenu";
import {getStocksByShopId} from "../../connect/connectStocks";
import {getAllShops} from "../../connect/connectShops";
import {getAllLossReasons} from "../../connect/connectStatics";
import {GlobalLoading} from "../common/loading/GlobalLoading";
import {GlobalError} from "../common/errors/GlobalError";
import {postManage} from "../../connect/connectManage";
import {usePopup} from "../common/popup/PopupContext";
import {useHighLevel} from "../auth/context/HighLevelAuthContext";

export function StorageManagement({shopId}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [remainingProducts, setRemainingProducts] = useState([])
    const [elements, setElements] = useState([])
    const [shops, setShops] = useState([]);
    const [reasons, setReasons] = useState([]);
    const navigate = useNavigate();
    const [myShop, setMyShop] = useState(null)
    const { invokePopup } = usePopup()
    const { token } = useHighLevel()
    const callback = useCallback( async (shopId) => {
        const newStocks = await getStocksByShopId(shopId);
        const newShops = await getAllShops()
        const newReasons = await getAllLossReasons()
        let errBuilder = ''
        if (newStocks.success) {
            setRemainingProducts(newStocks.data);
        } else {
            errBuilder += 'Cannot load stocks for this shop'
        }
        const idToFilter = Number(shopId);
        if (newStocks.success) {
            const filteredShops = newShops.data.filter((shop) => shop.id !== idToFilter);
            setShops(filteredShops);
        } else {
            errBuilder += 'Cannot load shop list'
        }
        if (newReasons.success) {
            setReasons(newReasons.data)
        } else {
            errBuilder += 'Cannot load reasons'
        }
        const shopNum = Number(shopId);
        const my = newShops.data.find((s)=>s.id===shopNum)
        setMyShop(my);
        setLoading(false)
        setError(errBuilder)
        }
    , [])
    useEffect(() => {
        callback(shopId).catch(error => { setError('Connection error'); console.log(error.message) })
    }, [shopId, callback]);
    const sortedReasons = sortReasons(reasons);

    const validateElements = () => {
        const numError = elements.filter((e)=>{
            if (e.amount < 1) {
                return true;
            }
            if (e.type !== "movement" && e.type !== "loss") {
                return true;
            }
            if (e.type === "movement" && e.shopId < 0) {
                return true;
            }
            if (e.type === "loss" && Number.parseInt(e.reasonId) < 0) {
                return true;
            }
            return false;
        }).length
        return numError === 0;
    }
    const onSubmit = () => {
        if (!validateElements()) {
            return;
        }
        postManage(shopId, elements, token).then(
            (s)=> {
                if (s.success) {
                    invokePopup('Changes saved!', 'green')
                    navigate(`/shops/${shopId}`);
                } else {
                    invokePopup(s.error ?? 'Connection Error!', 'red')
                }
            }
        ).catch(()=>invokePopup('Error!', 'red'))

    }
    const onBack = () => {
        navigate('/shops/1');
    }
    const [index, setIndex] = useState(0);

    if (loading) {
        return <GlobalLoading />
    }
    if (error !== '') {
        return <GlobalError text={error} />
    }
    return (
        <div className={"w-full"}>
            <p className={"location-hint"}>
            <span className={"location-link"} onClick={()=>{navigate('/shops')}}>Shops</span>/
            <span className={"location-link"} onClick={()=>{navigate(`/shops/${shopId}`)}}>{myShop?.name ?? '---'}</span>/Manage
            </p>
            {
                myShop == null ? (<p>Shop not found!</p>) :
                <div className={"w-full flex items-start"}>
                    <div className={"store-content"}>
                    {
                        remainingProducts.map((pr, i) => (
                            <StorageComponent key={i}
                                              remainingProduct={pr}
                                              elements={elements}
                                              setElements={setElements}
                                              shops={shops}
                                              reasons={sortedReasons}
                                              index={index}
                                              setIndex={setIndex}
                            />
                        ))
                    }
                    </div>
                <div className={"store-menu"}>
                    <StorageMenu shop={myShop} onSubmit={onSubmit} onBack={onBack} />
                </div>
            </div>
            }
        </div>
    )
}