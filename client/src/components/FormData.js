import React, { useEffect } from "react";
import "./styles/FormPage.css";
import FieldFactory from "./fields/FieldFactory";

const FormData
 = ({ stepData, formFields }) => {
  useEffect(() => {
    console.log(formFields);
    console.log(formFields[0].label);
  });
  return (
    <>
      <div className="form-page-container">
        <div className="form-card">
          <div className="form-fields">
            {formFields.map((field, index) => (
              <div className="form-field" key={index}>
                <label
                  htmlFor="fullName"
                  className={`form-label ${
                    field.isRequired ? "required-field" : ""
                  }`}
                >
                   {field?.label?.en ?? ''}
                </label>

                <FieldFactory field={field} />
              </div>
            ))}
            <input
              type="text"
              id="fullName"
              className="form-input"
              placeholder="Enter your full name"
            />
            <p className="form-hint">
              Please enter your name as it appears on official documents
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormData
;
