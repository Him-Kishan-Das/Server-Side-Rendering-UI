import React from "react";

const PhoneField = ({ field, value, onChange }) => {
  return (
  <input 
  type="tel" 
  name={field.variable} 
  id={field.variable} 
  required={field.isRequired}
  readOnly={field.isReadOnly}
  className="form-input"
  pattern="[0-9]{10}"
  placeholder={field.placeholder || 'Enter Phone number'}
  value={value || ''}
  onChange={(e) => onChange(e.target.value)}
  />
);
};

export default PhoneField;
