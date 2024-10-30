import React, {useState} from "react";

function SupplierList({onSelectSupplier, onTypeName}) {
    const [supplierId, setSupplierId] = useState(0);
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
    const m_onSupplierChange = (sup) => {
        onSelectSupplier(sup);
        setSupplierId(sup)
    }
    const m_onNameChange = (name) => {
        setName(name);
        onTypeName(name);
    }
    return (
        <div>
            {
                suppliersList.length <= 0 ?
                    (
                        <p>No suppliers available</p>
                    ) : suppliersList.length === 1 ? (
                        <p>Supplier: {suppliersList[0].title}</p>
                    ) : (
                        <select
                            id="supplier"
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
                    )
            }

            <label htmlFor={"supNameIn"}>Delivered by:</label>
            <input id={"supNameIn"} type={"text"} value={name} onChange={(e)=>m_onNameChange(e.target.value)} />
        </div>
    )
}
export default SupplierList