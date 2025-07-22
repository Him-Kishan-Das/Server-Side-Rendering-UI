import React from "react";

const FormReset = ({ button }) => {
    return (
        <>
            <button type="button" className="nav-btn" id={button.type}>{button.enLabel}</button>
        </>
    )
}

export default FormReset;