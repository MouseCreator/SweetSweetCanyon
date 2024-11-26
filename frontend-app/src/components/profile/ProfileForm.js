import {useState} from "react";
import {isValidPhone} from "../../utils/forms";
import "./../../static_controls/inputs.css"
import "./form.css"
export function ProfileForm({initialData, shopList, onSubmit, onCancel}) {
    const id = initialData.id
    const [name, setName] = useState(initialData?.name || '')
    const [nameError, setNameError] = useState(false)
    const [phone, setPhone] = useState(initialData?.phone || '')
    const [phoneError, setPhoneError] = useState(initialData?.phone || '')
    const [email, setEmail] = useState(initialData?.email || '')
    const [shopId, setShopId] = useState(initialData?.shopId)
    const [role, setRole] = useState(initialData?.role)

    const validateAll = () => {
        let valid = true;
        if (name === '' ) {
            setNameError(true)
            valid = false
        } else if (nameError) {
            setNameError(false)
        }
        let validPhone = true
        if (phone !== '') {
            validPhone = isValidPhone(phone)
        }
        if (!validPhone) {
            setPhoneError(true)
            valid = false
        } else if (phoneError) {
            setPhoneError(false)
        }
        return valid
    }

    const submitAll = () => {
        const isValid = validateAll()
        if (isValid) {
            onSubmit({
                id: id,
                name: name,
                phone: phone,
                email: email,
                shopId: shopId === -1 ? null : shopId,
                role: role
            })
        }
    }
    return (
        <div className={"form-overlay"}>
            <div className={"form-content"}>
                <h1 className={"form-title"}>Profile</h1>
                <div>
                    <label htmlFor={"name"} className={"form-wraps"}>Name</label>
                    <input id={"name"} className={"gen-input form-w-all"} value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor={"email"} className={"form-wraps"}>Email</label>
                    <input id={"email"} className={"gen-input form-w-all"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor={"phone"} className={"form-wraps"}>Phone</label>
                    <input id={"phone"} className={"gen-input form-w-all"} value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor={"role"} className={"form-wraps"}>Role</label>
                    <select id={"shop"} className={"gen-input form-w-all"} value={role} onChange={(e)=>setRole(e.target.value)}>
                        <option value={'none'}>None</option>
                        <option value={'cashier'}>Cashier</option>
                        <option value={'admin'}>Admin</option>
                    </select>
                </div>
                <div>
                    <label htmlFor={"shop"} className={"form-wraps"}>Shop</label>
                    <select id={"shop"} className={"gen-input form-w-all"} value={shopId} onChange={(e)=>setShopId(e.target.value)}>
                        <option value={-1}>-----</option>
                        {
                            shopList.map((s, i)=> (
                                <option key={i} value={s.id}>{s.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={"w-space"}></div>
                <div className={"form-buttons-line"}>
                    <button className={"gen-button font-25"} onClick={onCancel}>Cancel</button>
                    <button className={"gen-button green  font-25"} onClick={submitAll}>Save changes</button>
                </div>

            </div>
        </div>
    )
}