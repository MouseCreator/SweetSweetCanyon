import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "../../static_controls/loading.css"
import "../../static_controls/content.css"
import {ShopSimpleItem} from "./ShopSimple";
import {getAllShops} from "../../connect/connectShops";


export function ShopSimpleListing() {
    const [shops, setShops] = useState([]);
    const [loadingState, setLoadingState] = useState('loading');
    useEffect(()=>{
        getAllShops().then(
            (resp)=>{
                if (resp.success) {
                    setShops(resp.data)
                    setLoadingState('done')
                } else {
                    console.log(resp);
                    setLoadingState('error')
                }
            }
        ).catch((err)=>setLoadingState('error'));
    }, []);
    if (loadingState === 'loading') {
        return (
            <div className={'load-pr'}>Loading...</div>
        )
    }
    if (loadingState === 'error') {
        return (
            <div className={'load-err'}>Cannot load shops!</div>
        )
    }
    return (
        <div className={"flex justify-center w-full"}>
            <div className={"shop-simple-list"}>
                {
                    shops.map((p,index) => (
                        <Link to={`/shops/${p.id}`} key={index}>
                            <ShopSimpleItem shopInfo={p} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}