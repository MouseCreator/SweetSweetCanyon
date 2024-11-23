import {TransactionsControl} from "./TransactionsControl";
import {TransactionPageControl} from "./TransactionPageControl";
import {useCallback, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {TransactionItem} from "./TransactionItem";
import {getAllShops} from "../../connect/connectShops";
import {getTransactionList, getTransactionPages} from "../../connect/connectTransactions";
import {usePopup} from "../common/popup/PopupContext";


function TransactionsList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const defParams = {
        shopId: searchParams.get('shop') || 'all',
        type: searchParams.get('type') || "all",
        sort: searchParams.get('sort') || "recent"
    }
    const [transactions, setTransactions] = useState([]);
    const [shops, setShops] = useState([]);
    const [page, setPage] = useState(searchParams.get('page') || 0)
    const [params, setParams] = useState(defParams);
    const [numPages, setNumPages] = useState(0);

    const { invokePopup } = usePopup()
    const callback = useCallback((t, a)=>invokePopup(t,a), [invokePopup])

    const updatePages = useCallback(() => {
        const withParams = {
            ...params,
            page: page
        }

        getTransactionList(withParams).then((resp)=>{
            if (resp.success) {
                setTransactions(resp.data)
            } else {
                callback(resp.error, 'red')
            }
        }).catch((err)=>callback(err.message, 'red'))
        getTransactionPages(withParams).then((resp)=>{
            if (resp.success) {
                setNumPages(resp.data.numberPages)
            } else {
                callback(resp.error, 'red')
            }
        }).catch((err)=>callback(err.message, 'red'))
    }, [callback, params, page])
    useEffect(()=> {
        getAllShops().then((resp)=>{
            if (resp.success) {
                setShops(resp.data)
            } else {
                callback(resp.error, 'red')
            }
        }).catch(()=>callback('Cannot load shops!', 'red'))
        updatePages();
    }, [callback, updatePages, params])
    const updateParams = (newParams) => {
        setSearchParams(
            {
                shop: newParams.shop,
                type: newParams.type,
                sort: newParams.sort,
                page: page
            });
        setParams(newParams)
        updatePages();
    }
    const updatePage = (newPage) => {
        setSearchParams(
            {
                page: newPage
            });
        setPage(newPage)
        updatePages();
    }
    return (
        <main>
            <p className={"location-hint"}>Transactions/</p>
            <h2 className={"tr-text-pink"}>Filters:</h2>
            <TransactionsControl controlParams={params} updateControlParams={updateParams} shops={shops} />
            <h2 className={"tr-text-pink"}>Transactions:</h2>
            <div className={"tr-grid"}>
                { transactions.map((t,index) => (<TransactionItem key={index} itemData={t} />)) }
            </div>
            <TransactionPageControl page={page} onPageChange={updatePage} numPages={numPages} />
        </main>
    )
}
export default TransactionsList