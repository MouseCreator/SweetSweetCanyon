import React, {useEffect, useState} from "react";
import "./loss.css"
import "./../../static_controls/inputs.css"
import {CommonCheckbox} from "../common/checkbox/common-checkbox";
function LossReasonList({onSelectReason, onTypeComment, reasonError, commentError, free, onFreeCheck}) {
    const [supplierId, setSupplierId] = useState(-1);
    const [name, setName] = useState('');
    const reasonList = [
        {
            id: 1,
            title: 'Other'
        },
        {
            id: 2,
            title: 'Out of date'
        },
        {
            id: 3,
            title: 'Damaged'
        }
    ]
    const sortedReasons =
        reasonList.sort((a, b) => {
        if (a.title.toLowerCase() === 'other') return 1;
        if (b.title.toLowerCase() === 'other') return -1;
        return 0;
    });
    useEffect(()=> {
        if (reasonList.length===1) {
            onSelectReason(reasonList[0].id)
        }
    })
    const m_onSelectReason = (sup) => {
        onSelectReason(sup);
        setSupplierId(sup)
    }
    const m_onCommentChange = (name) => {
        setName(name);
        onTypeComment(name);
    }


    const toggleFree = () => {
        onFreeCheck(!free);
    };
    return (
        <div className={"loss-component"}>
            {
                sortedReasons.length <= 0 ?
                    (
                        <p className={"text-red-600"}>No suppliers available</p>
                    ) : (
                        <span>
                    {
                        sortedReasons.length === 1 ? (
                            <p><span className={"font-bold"}>Reason:</span> {sortedReasons[0].title}</p>
                        ) : (
                        <span>
                        <label className={"loss-component-label"} htmlFor={"reason"}>Reason:</label>
                        <select
                            id="reason"
                            className={`gen-input ${reasonError && "gen-error"} loss-component-mp`}
                            value={supplierId}
                            onChange={(e) => m_onSelectReason(e.target.value)}
                        >
                            <option value={-1} disabled>Select Reason</option>
                            {
                                sortedReasons.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.title}
                                    </option>
                                ))
                            }
                        </select>
                        <label className={"loss-component-label"} htmlFor={"supNameIn"}>Comment:</label>
                        <input className={`gen-input ${commentError && "gen-error"} loss-component-mp`}
                               id={"supNameIn"}
                               type={"text"}
                               value={name} onChange={(e)=>m_onCommentChange(e.target.value)}
                               />
                        <span className={"loss-component-label"}>Free: </span>
                        <CommonCheckbox theme={"orange"} size={"medium"} state={free} onChange={toggleFree} />
                    </span>
                        )
                    }
            </span>
                    )
            }
        </div>
    )
}
export default LossReasonList