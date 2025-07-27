import React from "react";

const TextView = ({field, value }) => {
    return (
        <div className="text-view">
            {value || field.value || 'N/A' }
        </div>
    );
};

export default TextView;