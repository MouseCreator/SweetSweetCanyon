import React from 'react';

export const SaleOverlayContent = ({ selectedProducts, onPay, onCancel }) => {
    return (
        <div>
            <button onClick={onPay}>Pay</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};