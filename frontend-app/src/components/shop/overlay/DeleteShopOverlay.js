
import React from "react";
import "../../../static_controls/inputs.css";
import "../shop.css"
const DeleteShopOverlay = ({ onDelete, onCancel, onManage }) => {
    return (
        <div className={"flex flex-col items-center"}>
            <h2 className={"payment-main"}>Are you sure you want to delete the shop?</h2>
            <p className={"shop-par"}>All the products remaining at this shop will be lost.
            If you want to move the products to other shops, manage the shop first.</p>
            <div>
                <button className={"gen-button payment-button red"} onClick={onDelete}>Delete</button>
                <button className={"gen-button payment-button pink"} onClick={onManage}>Manage shop</button>
                <button className={"gen-button payment-button"} onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};
export default DeleteShopOverlay