import React from "react";

const TextView = ({field}) => {
    return (
        <div className="text-view">
            {field.value || 'N/A' }
        </div>
    );
};

export default TextView;