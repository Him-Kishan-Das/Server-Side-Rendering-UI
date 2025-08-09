import React from "react";

const JsonBack = ({ button, onBack }) => {
    return (
        <button 
            type="button" 
            className="nav-button" 
            id={button.type}
            onClick={onBack}
        >
            {button.enLabel}
        </button>
    )
}

export default JsonBack;