import "../../common/header/products-header.css"
import {Link} from "react-router-dom";
export function ShopHeader({isAdmin}) {
    return (
        <header className={"cmn-head"}>
            <div className={"p-5 flex flex-row justify-between items-end"}>
                <h1 className={"cmn-head-title"}>Shops</h1>
                {
                    isAdmin &&
                    <div>
                        <Link className={"cmn-head-link"} to={"/products/create"}>New shop</Link>
                    </div>
                }
            </div>
        </header>
    )
}