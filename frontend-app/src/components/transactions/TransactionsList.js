import {TransactionsControl} from "./TransactionsControl";
import {TransactionPageControl} from "./TransactionPageControl";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {TransactionItem} from "./TransactionItem";

const MOCK_TRANSACTIONS = [
    {
        id: 1,
        type: 'sale',
        date: new Date(),
        products: [ {id: 1, name: 'A', amount: 2, price: 20} ],
        price: 11,
        shop: {
            id: 1,
            name: 'Shop'
        },
        cashier: 'Mouse'
    },
    {
        id: 2,
        type: 'supply',
        date: new Date(),
        products: [ {id: 1, name: 'A', amount: 2, price: 20} ],
        price: 44,
        shop: {
            id: 1,
            name: 'Shop'
        },
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
        date: new Date(),
        products: [ {id: 1, name: 'A', amount: 2, price: 20} ],
        price: 55,
        shop: {
            id: 1,
            name: 'Shop'
        },
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
        type: searchParams.get('type') || "sale",
        sort: searchParams.get('sort') || "recent"
    }
    const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
    const [shops, setShops] = useState(MOCK_SHOPS);
    const [page, setPage] = useState(searchParams.get('page') || 0)
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
            <p className={"location-hint"}>Transactions/</p>
            <h2 className={"tr-text-pink"}>Filters:</h2>
            <TransactionsControl controlParams={params} updateControlParams={updateParams} shops={shops} />
            <h2 className={"tr-text-pink"}>Transactions:</h2>
            <div className={"tr-grid"}>
                { transactions.map((t) => (<TransactionItem key={t.id} itemData={t} />)) }
            </div>
            <TransactionPageControl page={page} onPageChange={updatePage} numPages={numPages} />
        </main>
    )
}
export default TransactionsList