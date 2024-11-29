import React, {useState} from "react";
import "../../themed/forms.css"
import "../../themed/themed.css"
import {ShopImage} from "../image/ShopImage";

const ImageURLInput = ({initial, onChange, error}) => {
    const [url, setURL] = useState(initial);
    const handleChange = (e) => {
        const value = e.target.value;
        setURL(value)
        onChange(value)
    };

    return (
        <div className={"form-input-len"}>
            <div className={"w-full flex flex-col"}>
                <div className={"w-full"}>
                    <label className={"form-label"} htmlFor={"urlInput"}>URL</label>
                    <textarea className={`gen-area form-area-full ${error && "gen-error"}`} id={"urlInput"} value={url} onChange={handleChange} />
                </div>
                <div className={"flex justify-center w-full"}>
                    <div className={"form-img-holder flex items-center"}>
                        <ShopImage name={"Shop"} size={"s-medium"} pictureUrl={url} />
                    </div>
                </div>
            </div>
        </div>
    );
};
function ShopForm({mode, initialShop, onSubmit, onCancel}) {
    const [name, setName] = useState(initialShop?.name ?? '')
    const [description, setDescription] = useState(initialShop.description)
    const [address, setAddress] = useState(initialShop.address)
    const [hours, setHours] = useState(initialShop.workingHours)
    const [picture, setPicture] = useState(initialShop.pictureUrl == null ? '' : initialShop.pictureUrl)

    const [nameError, setNameError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [hoursError, setHoursError] = useState(false);
    const [pictureError, setPictureError] = useState(false);
    const validateData = () => {
        let error = false;
        if (!name || name.trim() === "") {
            setNameError(true);
            error = true;
        } else if (nameError) {
            setNameError(false);
        }

        if (description === undefined) {
            setDescError(true);
            error = true;
        } else if (nameError) {
            setDescError(false);
        }

        if (!address || address.trim() === "") {
            setAddressError(true);
            error = true;
        } else if (nameError) {
            setAddressError(false);
        }

        if (!hours || hours.trim() === "") {
            setHoursError(true);
            error = true;
        } else if (nameError) {
            setHoursError(false);
        }

        if (picture === undefined) {
            setPictureError(true);
            error = true;
        } else if (nameError) {
            setPictureError(false);
        }
        return !error;
    }
    const handleSubmit = () => {
        if (!validateData()) {
            return;
        }
        onSubmit({
            name: name,
            description: description,
            address: address,
            workingHours: hours,
            pictureUrl : picture
        })
    }

    return (
        <div className={"w-full"}>
            <div>
                <label className={"form-label"} htmlFor="name">Name</label>
                <input className={`gen-input form-input ${nameError && "gen-error"}`}
                       id={"name"} type={"text"}
                       value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label className={"form-label"} htmlFor="desc">Description</label>
                <textarea className={`gen-area form-area ${descError && "gen-error"}`}
                          id={"desc"}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div>
                <label className={"form-label"} htmlFor="address">Address</label>
                <input className={`gen-input form-input ${addressError && "gen-error"}`}
                       id={"name"}
                       type={"text"}
                       value={address}
                       onChange={(e) => setAddress(e.target.value)}/>
            </div>
            <div>
                <label className={"form-label"} htmlFor="hours">Working Hours</label>
                <input className={`gen-input form-input ${hoursError && "gen-error"}`}
                       id={"name"} placeholder={"9:00-21:00"}
                       type={"text"}
                       value={hours}
                       onChange={(e) => setHours(e.target.value)}/>
            </div>
            <ImageURLInput initial={picture} onChange={setPicture} error={pictureError}/>
            <div className={"form-buttons"}>
                <button className={"gen-button form-button"} onClick={onCancel}>Cancel</button>
                <button className={"gen-button pink form-button"}
                        onClick={handleSubmit}>{mode === 'create' ? 'Create' : 'Submit'}</button>
            </div>
        </div>
    )
}

export default ShopForm