import {SaleCheque} from "../common/SaleCheque";
import React from "react";
import './../../themed/themed.css';
export const LossOverlayContent = ({ selectedProducts, isFree, onLoss, onCancel }) => {
    return (
        <div>
            <h2 className={"payment-main"}>Loss</h2>
            <SaleCheque selectedProducts={selectedProducts} isFree={isFree} />
            <button className={"gen-button payment-button orange"} onClick={onLoss}>Submit</button>
            <button className={"gen-button payment-button"} onClick={onCancel}>Cancel</button>
        </div>
    );
};