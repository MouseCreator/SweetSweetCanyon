import {useState} from "react";
import './product.css'
import './../../index.css'

function ProductComponent({ product, is_added, onAdd, onCancel }) {
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
        <div>
            <div className={"flex justify-center items-center"} style={{border: 2, borderColor: selected ? 'green' : 'gray'}}>
                {
                    pictureUrl == null ?
                    (<div></div>) :
                    (<img className={"product-image"} src={ pictureUrl } alt={name} />)
                }
                <div>
                <p>{name}</p>
                <p>{price} $</p>
                </div>
                <input
                    type="checkbox"
                    checked={is_added}
                    onChange={handleCheckboxChange}
                />
            </div>
        </div>
    )
}

export default ProductComponent