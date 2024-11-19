import {useState} from "react";

import './product.css'
import './../themed/themed.css';
import {ProductImage} from "./ProductImage";
import {formatPrice} from "../../utils/date";
function SelectedProduct({ product, initAmount, onAmountChange, onCancel, errorType, getPrice }) {
    const id = product.id

    const [amount, setAmount] = useState(initAmount);
    const [errorValue, setErrorValue] = useState(false)

    const hasError = errorType !== "";

    const handleIncrement = () => {
        if (errorValue) {
            return;
        }
        setAmount((prevAmount) => prevAmount + 1);
        onAmountChange(id, amount+1);
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
        let value;
        let parsing = e.target.value
        parsing = parsing.trim()
        if (parsing === '') {
            value = 0
        } else {
            value = parseInt(parsing, 10);
        }
        const valueNaN = isNaN(value);
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
        <div className={`selected-product flex flex-row w-90 ${hasError && "bg-red-100"}`}>
            <div className={"selected-square-1 selected-on-text"}>
                <ProductImage name={product.name} size={"s-70"} pictureUrl={product.pictureUrl} />
            </div>
            <div className={"flex w-full flex-row selected-on-text p-2"}>
                { hasError ?
                    <div className={"selected-product-name"}>
                        <p>{product.name}</p>
                        <p className={"selected-product-error"}>{errorType}</p>
                    </div>
                    :
                <p className={"selected-product-name"}>{product.name}</p>
                }
                <p className={"selected-product-price"}>{formatPrice(getPrice(product))}</p>
            </div>
            <div className={"selected-square-3"}>
                <div className={"flex justify-between"}>
                    <div>
                        <button className="decrement-button selected-on-text" onClick={handleDecrement}>⬇️</button>
                        <input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            min="1"
                            className="amount-input gen-input"
                        />
                        <button className="increment-button selected-on-text" onClick={handleIncrement}>⬆️</button>
                    </div>
                    <div>
                        <button className="cancel-button selected-on-text" onClick={handleCancel}>❌</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectedProduct