import React, { createContext, useContext, useState } from "react";
import {Popup} from "./PopupComponent";
// Create Context
const PopupContext = createContext();

// Custom Hook for Popup
export const usePopup = () => {
    return useContext(PopupContext);
};

// Popup Provider
export const PopupProvider = ({ children }) => {
    const [popupData, setPopupData] = useState({ text: "", color: "", active: false });

    const invokePopup = (text, color) => {
        setPopupData({ text, color, active: true });
        setTimeout(() => {
            setPopupData((prev) => ({ ...prev, active: false }));
        }, 2000);
    };

    const invokePopupTimeout = (text, color, atomic, timeout) => {
        setTimeout(() => {
            if (!atomic.value) {
                return;
            }
            setPopupData({ text, color, active: true });
            setTimeout(() => {
                setPopupData((prev) => ({ ...prev, active: false }));
            }, 2000);
        }, timeout);
    };

    return (
        <PopupContext.Provider value={{ invokePopup, invokePopupTimeout }}>
            {children}
            <Popup text={popupData.text} active={popupData.active} color={popupData.color} />
        </PopupContext.Provider>
    );
};