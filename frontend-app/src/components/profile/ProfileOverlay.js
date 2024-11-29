import React from "react";

const ProfileOverlay = ({ onDelete, onCancel }) => {
    return (
        <div>
            <h2 className={"payment-main"}>Are you sure you want to delete your account?</h2>
            <button className={"gen-button payment-button red"} onClick={onDelete}>Delete</button>
            <button className={"gen-button payment-button"} onClick={onCancel}>Cancel</button>
        </div>
    );
};
export default ProfileOverlay