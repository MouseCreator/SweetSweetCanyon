import './product.css'
import './checkbox.css'
import './../../index.css'
import {formatPrice} from "../../utils/date";
import {ProductImage} from "./ProductImage"
import './../themed/themed.css';

function ProductCheckbox({is_added, theme}) {
    return (
        <div>
            <label className={`prod-checkbox ${theme}`}>
                <input
                    type="checkbox"
                    disabled={true}
                    checked={is_added}
                />
                <span className="checkmark"></span>
            </label>
        </div>
    )
}
function ProductComponent({ product, is_added, onAdd, onCancel, theme, inStock, getPrice }) {
    const name = product.name
    const pictureUrl = product.pictureUrl
    const price = getPrice(product)

    const useStock = inStock >= 0
    const handleCheckboxChange = () => {
        const newValue = !is_added;
        if (newValue) {
            onAdd(product);
        } else {
            onCancel(product);
        }
    };
    return (
        <div className={`product-component ${is_added ? `product-component-add ${theme}` : "product-component-not"}`}>
        <div className={"flex cursor-pointer"} onClick={handleCheckboxChange}>
            <div className={"w-1/2"}>
                <ProductImage pictureUrl={pictureUrl} name={name} size={"s-150"} />
            </div>
            <div className={"w-1/2 pt-2"}>
                <div className={"flex h-full flex-col justify-between"}>
                    <div>
                        <p className={"product-component-title"}>{name}</p>
                        <p className={"short-line"}>Price: {formatPrice(price)}</p>
                        {
                            useStock && (
                                <p className={"short-line"}>In stock: {inStock}</p>
                            )
                        }
                    </div>
                    <div className={"flex justify-end align-bottom product-component-cb-wrap"}>
                        <ProductCheckbox theme={theme} is_added={is_added} />
                    </div>
                </div>
            </div>

        </div>
    </div>
    )
}

export default ProductComponent