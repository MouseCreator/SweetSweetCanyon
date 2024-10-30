import React, {useState} from "react";
import SelectedProduct from "../products/SelectedProduct";
const USE_REASONS = [
    {
        id: 1,
        name: 'Out of date'
    },
    {
        id: 2,
        name: 'Poor quality'
    },
    {
        id: 3,
        name: 'Damaged'
    }
]
function LossComponent({ product, reasons, initAmount, onAmountChange, onCancel, onSetReason }) {
    const [lossReason, setLossReason] = useState(-1);

    const onChangeReason = (val) => {
        onSetReason(val);
        setLossReason(val);
    }
    return (
        <div>
            <SelectedProduct product={product} initAmount={initAmount} onAmountChange={onAmountChange} onCancel={onCancel} />
            <select
                id="reason"
                value={lossReason}
                onChange={(e) => onChangeReason(e.target.value)}
            >
                <option value={""} disabled>Select Shop</option>
                {
                    reasons.map((rsn) => (
                        <option key={rsn.id} value={rsn.id}>
                            {rsn.name}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}