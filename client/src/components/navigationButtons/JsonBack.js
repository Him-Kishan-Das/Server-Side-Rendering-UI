import React from "react";

const JsonBack = ({ button }) => {
    return (
        <>
            <button type="button" className="nav-button" id={button.type}>{button.enLabel}</button>
        </>
    )
}

export default JsonBack;