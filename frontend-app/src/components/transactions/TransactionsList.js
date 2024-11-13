import {TransactionsControl} from "./TransactionsControl";
import {TransactionPageControl} from "./TransactionPageControl";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";

const MOCK_TRANSACTIONS = [
    {
        id: 1,
        type: 'sale',
        date: Date,
        products: [],
        price: 11,
        cashier: 'Mouse'
    },
    {
        id: 2,
        type: 'supply',
        date: Date,
        products: [],
        price: 44,
        cashier: 'Mouse',
        supplier: {
            id: 1,
            title: 'Factory 1',
        },
        supplierName: 'George',
    },
    {
        id: 3,
        type: 'loss',
        date: Date,
        products: [],
        price: 55,
        cashier: 'Mouse',
        reason: {
            id: 1,
            title: 'Other'
        },
        comment: 'Lost'
    }
]
const MOCK_SHOPS = [
    {
        id: 1,
        name: 'Shop 1'
    },
    {
        id: 2,
        name: 'Shop 2'
    }
]

function TransactionsList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const defParams = {
        shopId: searchParams.get('shop') || 'all',
        type: searchParams.get('type') || "sell",
        sort: searchParams.get('sort') || "recent"
    }
    const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
    const [shops, setShops] = useState(MOCK_SHOPS);
    const [page, setPage] = useState(searchParams.get('page'))
    const [params, setParams] = useState(defParams);
    const [numPages, setNumPages] = useState(10);

    const updateParams = (newParams) => {
        setSearchParams(
            {
                shop: newParams.shop,
                type: newParams.type,
                sort: newParams.sort,
                page: page
            });
        setParams(newParams)
    }
    const updatePage = (newPage) => {
        setSearchParams(
            {
                page: newPage
            });
        setPage(newPage)
    }
    return (
        <main>
            <TransactionsControl controlParams={params} updateControlParams={updateParams} shops={shops} />
            <TransactionPageControl page={page} onPageChange={updatePage} numPages={numPages} />
        </main>
    )
}
export default TransactionsList