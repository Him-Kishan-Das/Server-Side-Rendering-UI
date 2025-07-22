import React from "react";

const PhoneField = ({ field }) => {
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
  />
);
};

export default PhoneField;
