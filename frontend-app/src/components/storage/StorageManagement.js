import {useEffect, useState} from "react";
import {StorageComponent} from "./StorageComponent";
import {sortReasons} from "../../utils/data";
import {useNavigate} from "react-router-dom";
import {StorageMenu} from "./StorageMenu";

const MOCK_STOCKS = [
    {
        product: {
            id: 1,
            name: 'cookie',
            price: 10,
            pictureUrl: 'https://assets.bonappetit.com/photos/5ca534485e96521ff23b382b/1:1/w_2700,h_2700,c_limit/chocolate-chip-cookie.jpg'
        },
        remaining: 10
    },
    {
        product: {
            id: 2,
            name: 'cake',
            price: 20,
            pictureUrl: 'https://static01.nyt.com/images/2023/10/27/multimedia/27cakerex-plzm/27cakerex-plzm-threeByTwoMediumAt2X.jpg'
        },remaining: 10
    },
    {
        product: {
            id: 3,
            name: 'tasty marshmallow colors',
            price: 30,
            pictureUrl: 'https://static.toiimg.com/thumb/52762770.cms?imgsize=65333&width=800&height=800'
        },
        remaining: 10
    },
    {
        product: {
            id: 4,
            name: 'muffins',
            price: 25,
            pictureUrl: 'https://www.allrecipes.com/thmb/RdyL1EgIB0Qq_fr5HjdsAmcpMlU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/228553-moist-chocolate-muffins-DDMFS-4x3-a9f73a46938547c99d921613dc167741.jpg'
        },
        remaining: 0
    },
    {
        product: {
            id: 5,
            name: 'mint candies',
            price: 10,
            pictureUrl: 'https://5.imimg.com/data5/LL/LL/GLADMIN-/mint-candy-250x250.jpg'
        },
        remaining: 20
    },
    {
        product: {
            id: 6,
            name: 'Product with no image',
            price: 10,
            pictureUrl: null
        },
        remaining: 10
    }
]

const MOCK_SHOPS = [
    {
        id: 1,
        name: 'Shop 1',
        address: 'Sweet street'
    },
    {
        id: 2,
        name: 'Shop 2',
        address: 'Cookie Ave'
    },
    {
        id: 3,
        name: 'Shop 3',
        address: 'Cake Alley'
    }
]

const LOSS_REASONS = [
    {
        id: 1,
        title: 'Other'
    },
    {
        id: 2,
        title: 'Out of date'
    },
    {
        id: 3,
        title: 'Damaged'
    }
]
export function StorageManagement({shopId}) {
    const [remainingProducts, setRemainingProducts] = useState(MOCK_STOCKS)
    const [elements, setElements] = useState([])
    const [shops, setShops] = useState(MOCK_SHOPS);
    const [reasons, setReasons] = useState(LOSS_REASONS);
    const navigate = useNavigate();
    useEffect(() => {
        const idToFilter = Number(shopId);
        const filteredShops = MOCK_SHOPS.filter((shop) => shop.id !== idToFilter);
        setShops(filteredShops);
    }, [shopId]);
    const sortedReasons = sortReasons(reasons);

    const validateElements = () => {
        const numError = elements.filter((e)=>{
            if (e.amount < 1) {
                return true;
            }
            if (e.type !== "movement" || e.type !== "loss") {
                return true;
            }
            if (e.type === "movement" && e.shopId < 0) {
                return true;
            }
            if (e.type === "loss" && e.reasonId < 0) {
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
        navigate('/shops/1');
    }
    const onBack = () => {
        navigate('/shops/1');
    }
    const [index, setIndex] = useState(0);
    const shopNum = Number(shopId);
    const myShop = MOCK_SHOPS.find((s)=>s.id===shopNum)
    return (
        <div className={"w-full"}>
            {
                myShop === undefined ? (<p>Shop not found!</p>) :
                <div className={"w-full flex items-start"}>
                    <div className={"store-content"}>
                    {
                        remainingProducts.map((pr) => (
                            <StorageComponent remainingProduct={pr}
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