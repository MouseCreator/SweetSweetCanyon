import React, { useState, useEffect } from "react";
import "./popup.css";

export const Popup = ({ text, active, color }) => {
    return (
        <div
            className={`popup ${color} ${active ? "popup-active" : ""}`}
        >
            {text}
        </div>
    );
};