import React from "react";

const SystemBack = ({ button }) => {
    return (
        <>
            <button className="nav-button" type="button" id={button.type}>{button.enLabel}</button>
        </>
    )
}

export default SystemBack;