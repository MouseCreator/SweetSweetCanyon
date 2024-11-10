import React, {useState} from "react";
const PriceInput = ({myId, onChange}) => {
    const [price, setPrice] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;

        if (value === '' || !isNaN(value)) {
            setPrice(value);
        }
    };

    const handleBlur = () => {
        if (price !== '') {
            const roundedPrice = parseFloat(price).toFixed(2);
            setPrice(roundedPrice);
            onChange(roundedPrice);
        }
    };

    return (
        <div>
            <input
                id={myId}
                type="number"
                step="0.01"
                value={price}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    );
};

const ImageURLInput = ({initial, onChange}) => {
    const [url, setURL] = useState(initial);
    const handleChange = (e) => {
        const value = e.target.value;
        setURL(value)
        onChange(value)
    };

    return (
        <div>
            <div>
            <p>Preview</p>
            { url === '' ?
                <div>No image</div> :
                <img id={"preview"} src={url} alt={"Product"} />
            }
            </div>
            <div>
                <label htmlFor={"urlInput"}>URL</label>
                <textarea id={"urlInput"} onChange={handleChange} />
            </div>
        </div>
    );
};
function ProductForm({mode, initialProduct, onSubmit, onCancel}) {
    const [name, setName] = useState(initialProduct.name)
    const [description, setDescription] = useState(initialProduct.description)
    const [price, setPrice] = useState(initialProduct.price)
    const [picture, setPicture] = useState(initialProduct.pictureUrl)

    const handleSubmit = () => {
        onSubmit({
            name: name,
            description: description,
            price: price,
            picture : picture
        })
    }

    return (
        <div>
            <div>
                <label htmlFor="name">Name</label>
                <input id={"name"} type={"text"} value={name}/>
            </div>
            <div>
                <label htmlFor="desc">Description</label>
                <textarea id={"desc"} value={description}/>
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <PriceInput myId={"price"} onChange={setPrice} />
            </div>
            <ImageURLInput initial={''} onChange={setPicture}/>
            <button onClick={handleSubmit}>{mode === 'create' ? 'Create' : 'Submit'}</button>
        </div>
    )
}

export default ProductForm