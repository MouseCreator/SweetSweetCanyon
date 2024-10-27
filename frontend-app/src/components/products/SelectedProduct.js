import {useState} from "react";

import './product.css'
function SelectedProduct({ product, initAmount, onAmountChange, onCancel }) {
    const id = product.id

    const [amount, setAmount] = useState(initAmount);
    const [errorValue, setErrorValue] = useState(false)

    const handleIncrement = () => {
        if (errorValue) {
            return;
        }
        setAmount((prevAmount) => prevAmount + 1);
        onAmountChange(id, amount);
    };

    const handleDecrement = () => {
        if (errorValue) {
            return;
        }
        const newAmount = amount - 1;
        if (newAmount < 1) {
            onCancel(product);
            return;
        }
        setAmount(newAmount);
        onAmountChange(id, newAmount);

    };

    const handleCancel = () => {
        onCancel(product);
    };

    const handleAmountChange = (e) => {
        let value = 0;
        let parsing = e.target.value
        parsing = parsing.trim()
        if (parsing === '') {
            value = 0
        } else {
            value = parseInt(parsing, 10);
        }
        const valueNaN =isNaN(value);
        if (valueNaN) {
            setErrorValue(true)
        }
        else {
            setErrorValue(false)
            setAmount(value);
            onAmountChange(id, value)
        }
    };


    return (
        <div className="selected-product">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
                <h3>{product.name}</h3>
            </div>
            <button className="increment-button" onClick={handleIncrement}>⬆️</button>
            <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                min="1"
                className="amount-input"
            />
            <button className="decrement-button" onClick={handleDecrement}>⬇️</button>
            <button className="cancel-button" onClick={handleCancel}>❌</button>
        </div>
    );
}

export default SelectedProduct