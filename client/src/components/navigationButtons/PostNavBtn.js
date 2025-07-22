import React from "react";

const PostNavBtn = ({ button }) => {
    return (
        <>
            <button type="button" className="nav-button" id={button.type}>{button.enLabel}</button>
        </>
    )
}

export default PostNavBtn;