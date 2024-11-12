import {useState} from "react";
import {Link} from "react-router-dom";
import ProductSimple from "../products/ProductSimple";
import "../../static_controls/content.css"
import {ShopSimpleItem} from "./ShopSimple";

const MOCK_SHOPS = [
    {
        id: 1,
        name: "Sweeties",
        address: "Sweet street",
        description: "hello",
        workingHours: "9:00-21:00",
        pictureUrl: ""
    },
    {
        id: 2,
        name: "Sweeties",
        address: "Sweet street",
        description: "hello",
        workingHours: "9:00-21:00",
        pictureUrl: ""
    }
]
export function ShopSimpleListing() {
    const [shops, setShops] = useState(MOCK_SHOPS);
    return (
        <div className={"flex justify-center w-full"}>
            <div className={"shop-simple-list"}>
                {
                    shops.map((p) => (
                        <Link to={`/shops/${p.id}`}>
                            <ShopSimpleItem shopInfo={p} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}