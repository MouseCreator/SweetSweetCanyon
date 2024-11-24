import "../../static_controls/inputs.css"
import "./transactions.css"
import React from "react";
export function TransactionsControl({controlParams, updateControlParams, shops}) {

    const selectType = (type) => {
        controlParams.type = type
        updateControlParams(controlParams);
    }
    const selectShop = (shop) => {
        controlParams.shop = shop
        updateControlParams(controlParams);
    }
    const selectSortBy = (sortBy) => {
        controlParams.sort = sortBy
        updateControlParams(controlParams);
    }
    return (
        <div className={"tr-control-common"}>
            <div className={"tr-control-item"}>
                <label htmlFor={"type"}>Type:</label>
                <select
                    id="type"
                    className={`gen-input`}
                    value={controlParams.type}
                    onChange={(e) => selectType(e.target.value)}>
                    <option value={"all"}>All</option>
                    <option value={"sale"}>Sale</option>
                    <option value={"loss"}>Loss</option>
                    <option value={"supply"}>Supply</option>
                    <option value={"move"}>Movement</option>
                </select>
            </div>
            <div className={"tr-control-item"}>
                <label htmlFor={"type"}>Shop:</label>
                <select
                    id="type"
                    className={`gen-input`}
                    value={controlParams.shop}
                    onChange={(e) => selectShop(e.target.value)}>
                    <option value={"all"}>All</option>
                    {
                        shops.map((s)=>(<option key={s.id} value={s.id}>{s.name}</option>))
                    }
                </select>
            </div>
            <div className={"tr-control-item"}>
                <label htmlFor={"type"}>Sort by:</label>
                <select
                    id="type"
                    className={`gen-input`}
                    value={controlParams.sort}
                    onChange={(e) => selectSortBy(e.target.value)}>
                    <option value={"recent"}>Recent</option>
                    <option value={"price"}>Price</option>
                    <option value={"oldest"}>Oldest</option>
                </select>
            </div>
        </div>
    )
}
