import React from "react";

const FormReset = ({ button, onReset }) => {
    return (
        <button 
            type="button" 
            className="nav-btn" 
            id={button.type}
            onClick={onReset}
        >
            {button.enLabel}
        </button>
    )
}

export default FormReset;