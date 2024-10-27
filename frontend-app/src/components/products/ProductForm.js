import React, {useState} from "react";

function ProductForm(initialProduct, onSubmit, onCancel) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [picture, setPicture] = useState('')

    return (
        <div>
            <label htmlFor="email">Email</label>
            <input id={"name"} type={"text"}/>
        </div>
    )
}

export default ProductForm