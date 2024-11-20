import {useEffect, useState} from "react";
import ProductSimple from "./ProductSimple";
import "./simple.css"
import {Link} from "react-router-dom";
import {getAllProducts} from "../../connect/connectProducts";
import {usePopup} from "../common/popup/PopupContext";

export function ProductSimpleListing() {
    const [products, setProducts] = useState([]);
    const {invokePopup} = usePopup();
    const fetchProducts = async () => {
        const response = await getAllProducts();
        if (response.success) {
            setProducts(response.data);
        } else {
            invokePopup('Cannot get products from server', 'red');
        }
    }
    useEffect(()=>{ fetchProducts(); } ,[])
    return (
        <div>
            <div className={"simple-container"}>
            {
                products.length === 0 ?
                    (<div className={"simple-placeholder"}>No products added yet</div>)
                    :

                products.map((p) => (
                    <Link to={`/products/${p.id}`}>
                        <ProductSimple product={p} />
                    </Link>
                ))

            }
            </div>
        </div>
    )
}