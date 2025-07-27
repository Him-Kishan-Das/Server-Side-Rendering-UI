import React, { useEffect } from "react";
import "./styles/FormPage.css";
import FieldFactory from "./fields/FieldFactory";

const FormData
 = ({ stepData, formFields, formValues, onFieldChange }) => {
  useEffect(() => {
    // These console logs are useful for debugging but can be removed in production
    console.log("Form Fields for current step:", formFields);
    console.log("Current Form Values (FormData component):", formValues);
  }, [formFields, formValues]); // Depend on formFields and formValues to log changes

  return (
    <>
      <div className="form-page-container">
        <div className="form-card">
          <div className="form-fields">
            {formFields.map((field, index) => (
              <div className="form-field" key={index}>
                <label
                  htmlFor={field.variable} // Use field.variable as id for better accessibility
                  className={`form-label ${
                    field.isRequired ? "required-field" : ""
                  }`}
                >
                   {field?.label?.en ?? ''}
                </label>

                {/* Pass the current field value from formValues to FieldFactory */}
                <FieldFactory 
                  field={field} 
                  value={formValues[field.variable]} // Pass current value
                  onChange={(value) => onFieldChange(field.variable, value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormData
;