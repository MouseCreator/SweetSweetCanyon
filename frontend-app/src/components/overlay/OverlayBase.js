import React from 'react';
import './overlay.css';
import './../themed/themed.css';

export const OverlayBase = ({ children, isActive, onClose }) => {
    if (!isActive) return null;

    return (
        <div className="overlay-base" onClick={onClose}>
            <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
