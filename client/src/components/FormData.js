import React, { useEffect } from "react";
import "./styles/FormPage.css";
import FieldFactory from "./fields/FieldFactory";

const FormData = ({ stepData, formFields, formValues, onFieldChange, formDraftValue, currentStep }) => {
  useEffect(() => {
    console.log("Form Fields for current step:", formFields);
    console.log("Current Form Values (FormData component):", formValues);
    console.log("Form Draft values: ", formDraftValue);
  }, [formFields, formValues, formDraftValue]); 

  const stepDraftValues = formDraftValue?.steps?.[currentStep] || {};
  
  const mergedValues = {...stepDraftValues, ...formValues};

  return (
    <>
      <div className="form-page-container">
        <div className="form-card">
          <div className="form-fields">
            {formFields.map((field, index) => (
              <div className="form-field" key={index}>
                <label
                  htmlFor={field.variable} 
                  className={`form-label ${
                    field.isRequired ? "required-field" : ""
                  }`}
                >
                  {field?.label?.en ?? ''}
                </label>

                <FieldFactory 
                  field={field} 
                  value={mergedValues[field.variable]}
                  onChange={(value) => onFieldChange(field.variable, value)}
                  formValues={mergedValues} 
                  onFieldChange={onFieldChange} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormData;