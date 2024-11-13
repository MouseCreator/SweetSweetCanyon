import React, {useEffect, useState} from "react";
import "./supply.css"
import "../../../static_controls/inputs.css"
function SupplierList({onSelectSupplier, onTypeName, supplierError, nameError}) {
    const [supplierId, setSupplierId] = useState(-1);
    const [name, setName] = useState('');
    const suppliersList = [
        {
            id: 1,
            title: 'Factory 1'
        },
        {
            id: 2,
            title: 'Factory 2'
        }
    ]
    useEffect(()=> {
        if (suppliersList.length===1) {
            onSelectSupplier(suppliersList[0].id)
        }
    })
    const m_onSupplierChange = (sup) => {
        onSelectSupplier(sup);
        setSupplierId(sup)
    }
    const m_onNameChange = (name) => {
        setName(name);
        onTypeName(name);
    }


    return (
        <div className={"supply-component"}>
            {
            suppliersList.length <= 0 ?
                (
                    <p className={"text-red-600"}>No suppliers available</p>
                ) : (
                    <span>
                    {
                    suppliersList.length === 1 ? (
                        <p><span className={"font-bold"}>Supplier:</span> {suppliersList[0].title}</p>
                    ) : (
                    <span>
                        <label className={"supply-component-label"} htmlFor={"supplier"}>Supplier:</label>
                        <select
                            id="supplier"
                            className={`gen-input ${supplierError && "gen-error"} supply-component-mp`}
                            value={supplierId}
                            onChange={(e) => m_onSupplierChange(e.target.value)}
                            >
                            <option value={-1} disabled>Select Supplier</option>
                            {
                                suppliersList.map((supplier) => (
                                    <option key={supplier.id} value={supplier.id}>
                                        {supplier.title}
                                    </option>
                                ))
                            }
                        </select>
                        <label className={"supply-component-label"} htmlFor={"supNameIn"}>Delivered by:</label>
                        <input className={`gen-input ${nameError && "gen-error"} supply-component-mp`}
                               id={"supNameIn"}
                               type={"text"}
                               value={name} onChange={(e)=>m_onNameChange(e.target.value)}
                               placeholder={"Deliverer's name"}/>
                    </span>
                    )
                    }
            </span>
                )
            }
            </div>
    )
}
export default SupplierList