import React from "react";

const TextField = ({field, value, onChange }) => {
    return (
        <input type="text" name={field.variable} id={field.variable} required={field.isRequired} className="form-input" placeholder={field.placeholder || ''} value={value || ''} onChange={(e) => onChange(e.target.value)} />
    );
};

export default TextField;