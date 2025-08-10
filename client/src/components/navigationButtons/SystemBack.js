import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const SystemBack = ({ button }) => {
    const { serviceId } = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/forms/service/${serviceId}`);
    };

    return (
        <button 
            className="nav-button" 
            type="button" 
            id={button.type}
            onClick={handleClick}
        >
            {button.enLabel}
        </button>
    );
};

export default SystemBack;