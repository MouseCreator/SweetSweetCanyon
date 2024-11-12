import React from 'react';
import {SaleCheque} from "../common/SaleCheque";
import './../../themed/themed.css';
export const SupplyOverlayContent = ({ selectedProducts, onPay, onCancel }) => {
    return (
        <div>
            <h2 className={"payment-main"}>Supply</h2>
            <SaleCheque selectedProducts={selectedProducts}/>
            <button className={"gen-button payment-button blue"} onClick={onPay}>Add to stock</button>
            <button className={"gen-button payment-button"} onClick={onCancel}>Cancel</button>
        </div>
    );
};