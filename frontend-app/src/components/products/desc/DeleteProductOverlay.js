
import React from "react";
import "../../../static_controls/inputs.css";

const SaleOverlayContent = ({ onDelete, onCancel }) => {
    return (
        <div>
            <h2 className={"payment-main"}>Are you sure you want to delete the product?</h2>
            <button className={"gen-button payment-button red"} onClick={onDelete}>Delete</button>
            <button className={"gen-button payment-button"} onClick={onCancel}>Cancel</button>
        </div>
    );
};
export default SaleOverlayContent