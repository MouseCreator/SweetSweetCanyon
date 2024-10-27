import {useState} from "react";
import './product.css'

function ProductComponent({ product, is_added, onAdd, onCancel }) {

    const [selected, setSelected] = useState( is_added);
    const name = product.name
    const pictureUrl = product.picture
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
        <div style={{border: 2, borderColor: selected ? 'green' : 'gray'}}>
            {
                pictureUrl == null ?
                (<div></div>) :
                (<img src={ pictureUrl } alt={name} />)
            }
            <p>{name}</p>
            <input
                type="checkbox"
                checked={selected}
                onChange={handleCheckboxChange}
            />
        </div>
    )
}

export default ProductComponent