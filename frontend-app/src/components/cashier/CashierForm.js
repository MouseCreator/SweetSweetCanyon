
import React, { useState } from 'react';
import {isValidEmail, isValidPhone, mapEmail, mapPhone, trimStringInput} from "../../utils/forms";
const CashierForm = ({ mode, initial, onSubmit, onCancel }) => {
    const [name, setName] = useState( initial.name);
    const [shopId, setShopId] = useState( initial.shop === -1 ? "" : initial.shop );
    const [email, setEmail] = useState( initial.email);
    const [phone, setPhone] = useState( initial.phone);
    const [userMessage, setUserMessage] = useState( 'Provide your data, please');
    const [formStateFlag, setFormStateFlag] = useState( 'initial');

    const shopDataArray = [
        { id: 1, name: 'Shop 1' },
        { id: 2, name: 'Shop 2' },
        { id: 3, name: 'Shop 3' },
    ];
    const validateData = () => {
        let success = true
        let message = ''
        if (name === null || name.trim() === '') {
            message = 'Fill the name input, please'
            success = false;
        }
        if (shopId === null || shopId === "") {
            message = message === '' ? 'Choose the shop you work in, please' : message
            success = false;
        }
        if (phone === null || phone === '' || !isValidPhone(phone)) {
            message = message === '' ? 'Enter a valid phone number, please' : message
            success = false;
        }
        if (email === null || email === '' || !isValidEmail(email)) {
            message = message === '' ? 'Enter a valid email, please' : message
            success = false;
        }
        if (message !== '') {
            setUserMessage(message)
        }
        if (!success) {
            setFormStateFlag('error')
        }
        return success;
    }
    const handleSave = (e) => {
        e.preventDefault();
        const isValidForm = validateData();
        if (!isValidForm) {
            return;
        }
        const withName = trimStringInput(name)
        const withShop = shopId
        const withPhone = mapPhone(phone)
        const withMain = mapEmail(email)
        const formData = {
            name: withName,
            shop: withShop,
            phone: withPhone,
            email: withMain };
        if (isValidForm) {
            setFormStateFlag('success')
            setUserMessage('Form submitted!')
            onSubmit(formData);
        }
    };
    const handleCancel = (e) => {
        e.preventDefault();
        onCancel();
    }
    const userMessageColor = () => {
        if (formStateFlag === 'initial') {
            return 'black'
        }
        if (formStateFlag === 'error') {
            return 'red'
        }
        if (formStateFlag === 'success') {
            return 'green'
        }
    }
    return (
        <div>
        <div>
            <p style={{ color: userMessageColor() }}>{userMessage}</p>
        </div>
        <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
            />
        </div>
        <div className="input-group">
            <label htmlFor="shop">Shop</label>
            <select
                id="shop"
                value={shopId}
                onChange={(e) => setShopId(e.target.value)}
            >
                <option value={""} disabled>Select Shop</option>
                {
                    shopDataArray.map((shop) => (
                        <option key={shop.id} value={shop.id}>
                            {shop.name}
                        </option>
                    ))
                }
            </select>
        </div>
        <div className="input-group">
            <label htmlFor="phone">Phone</label>
            <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
            />
        </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                />
            </div>
        <div className="button-group">
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
    </div>
)
}

export default CashierForm