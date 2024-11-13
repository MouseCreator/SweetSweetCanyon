import React, {useState} from "react";
import "../themed/forms.css"
import "../themed/themed.css"
import {ProductImage} from "./ProductImage";
const PriceInput = ({myId, initial, onChange, error}) => {
    const [price, setPrice] = useState(initial);

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
            <input className={`form-input gen-input ${error && "gen-error"}`}
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

const ImageURLInput = ({initial, onChange, error}) => {
    const [url, setURL] = useState(initial);
    const handleChange = (e) => {
        const value = e.target.value;
        setURL(value)
        onChange(value)
    };

    return (
        <div className={"form-input-len"}>
            <div className={"image-form w-full"}>
                <div className={"w-full"}>
                    <label className={"form-label"} htmlFor={"urlInput"}>URL</label>
                    <textarea className={`gen-area form-area-full ${error && "gen-error"}`} id={"urlInput"} value={url} onChange={handleChange} />
                </div>
                <div className={"flex justify-end w-1/2"}>
                    <div className={"form-img-holder"}>
                        <ProductImage name={"Product"} size={"s-150"} pictureUrl={url} />
                    </div>
                </div>
            </div>
        </div>
    );
};
function ProductForm({mode, initialProduct, onSubmit, onCancel}) {
    const [name, setName] = useState(initialProduct.name)
    const [description, setDescription] = useState(initialProduct.description)
    const [price, setPrice] = useState(initialProduct.price)
    const [picture, setPicture] = useState(initialProduct.pictureUrl)

    const [nameError, setNameError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [pictureError, setPictureError] = useState(false);

    const validateData = () => {
        let error = false;
        if (!name || name.trim() === "") {
            setNameError(true);
            error = true;
        } else if (nameError) {
            setNameError(false);
        }

        if (description === undefined) {
            setDescError(true);
            error = true;
        } else if (nameError) {
            setDescError(false);
        }

        if (price <= 0) {
            setPriceError(true);
            error = true;
        } else if (nameError) {
            setPriceError(false);
        }
        if (picture === undefined) {
            setPictureError(true);
            error = true;
        } else if (nameError) {
            setPictureError(false);
        }

        return !error;
    }
    const handleSubmit = () => {
        if (!validateData()) {
            return
        }
        onSubmit({
            name: name,
            description: description,
            price: price,
            picture : picture
        })
    }

    return (
        <div className={"w-full"}>
            <div>
                <label className={"form-label"} htmlFor="name">Name</label>
                <input className={`gen-input form-input ${nameError && "gen-error"}`} id={"name"} type={"text"} value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label className={"form-label"} htmlFor="desc">Description</label>
                <textarea className={`gen-area form-area ${descError && "gen-error"}`} id={"desc"} value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div>
                <label className={"form-label"} htmlFor="price">Price</label>
                <PriceInput myId={"price"} initial={price} onChange={setPrice} error={priceError} />
            </div>
            <ImageURLInput initial={picture} onChange={setPicture} error={pictureError}/>
            <div className={"form-buttons"}>
                <button className={"gen-button form-button"} onClick={onCancel}>Cancel</button>
                <button className={"gen-button pink form-button"} onClick={handleSubmit}>{mode === 'create' ? 'Create' : 'Submit'}</button>
            </div>
        </div>
    )
}

export default ProductForm