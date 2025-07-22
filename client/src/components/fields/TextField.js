import React from "react";

const TextField = ({field}) => {
    return (
        <input type="text" name={field.variable} id={field.variable} required={field.isRequired} className="form-input" placeholder={field.placeholder || ''} />
    );
};

export default TextField;