import React from 'react';
import {SaleCheque} from "../common/SaleCheque";
import './../../themed/themed.css';
export const SaleOverlayContent = ({ selectedProducts, onPay, onCancel }) => {
    return (
        <div>
            <h2 className={"payment-main"}>Payment</h2>
            <SaleCheque selectedProducts={selectedProducts}/>
            <button className={"gen-button payment-button green"} onClick={onPay}>Pay</button>
            <button className={"gen-button payment-button"} onClick={onCancel}>Cancel</button>
        </div>
    );
};