import {useState} from "react";
import './product.css'
import './checkbox.css'
import './../../index.css'
import {NoProductUrl} from "../../static_controls/Images";
import {formatPrice} from "../../utils/date";

function ProductImage({pictureUrl, name}) {
    return (
        <div className={"product-component-image-wrap"}>
            {
                pictureUrl == null ?
                (<img className={"product-component-image product-image-fit"} src = {NoProductUrl()} alt={name}></img>) :
                (<img className={"product-component-image product-image-fit"} src={ pictureUrl } alt={name} />)
            }
        </div>
    )
}

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
function ProductComponent({ product, is_added, onAdd, onCancel, theme }) {
    const [selected, setSelected] = useState(is_added);
    const name = product.name
    const pictureUrl = product.pictureUrl
    const price = product.price
    const handleCheckboxChange = () => {
        const newValue = !selected;
        setSelected(newValue);

        if (newValue) {
            onAdd(product);
        } else {
            onCancel(product);
        }
    };
    return (
        <div className={"product-component"}
             style={
                {
                    borderColor: selected ? '#4BC134' : '#aaaaaa',
                }
        }
        >
        <div className={"flex cursor-pointer"} onClick={handleCheckboxChange}>
            <div className={"w-1/2"}>
            <ProductImage pictureUrl={pictureUrl} name={name} />
            </div>
            <div className={"w-1/2 pt-2"}>
                <div className={"flex h-full flex-col justify-between"}>
                    <div>
                        <p className={"product-component-title"}>{name}</p>
                        <p>Price: {formatPrice(price)}</p>
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