import React, {useEffect, useState} from "react";
import "./loss.css"
import "../../../static_controls/inputs.css"
import {sortReasons} from "../../../utils/data";
import {getAllLossReasons} from "../../../connect/connectStatics";
function LossReasonList({onSelectReason, onTypeComment, reasonError, commentError}) {
    const [supplierId, setSupplierId] = useState(-1);
    const [name, setName] = useState('');
    const [reasonList, setReasonList] = useState([])
    useEffect(() => {
         getAllLossReasons().then((r)=>{
            if (r.success) {
                setReasonList(r.data)
            } else {
                console.log(r.error)
            }
        })
    })
    const sortedReasons = sortReasons(reasonList);
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