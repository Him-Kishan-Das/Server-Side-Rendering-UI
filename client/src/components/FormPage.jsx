import React, { useEffect } from "react";
import './styles/FormPage.css';

const FormPage = ({ stepData, formFields }) => {
  useEffect(() => {
    console.log(formFields);
    console.log(formFields[0].label);
  });
  return (
    <>
      <div className="form-page-container">
        <div className="form-card">
          <div className="form-fields">
            {formFields.map((fields, index) => (
              <div className="form-field" key={index}>
                <label
                  htmlFor="fullName"
                  className={`form-label ${
                    fields.isRequired ? "required-field" : ""
                  }`}
                >
                  {fields.label.en}
                </label>
                {/* Type = dropdown */}
                {fields.type === "dropdown" && (
                  <select
                    name={fields.variable}
                    id={fields.variable}
                    required={fields.isRequired === "true"}
                  >
                    <option value="">Option 1</option>
                  </select>
                )}

                {/* Type = textfield  */}
                {fields.type === "textfield" && (
                  <input
                    type="text"
                    name={fields.variable}
                    id={fields.variable}
                    required={fields.isRequired === "true"}
                  />
                )}

                {/* Type = textView  */}
                {fields.type === "textView" && (
                  <input
                    type="text"
                    name={fields.variable}
                    id={fields.variable}
                    required={fields.isRequired === "true"}
                    readOnly={fields.isReadOnly === "true"}
                  />
                )}

                {/* Type = phonefield  */}
                {fields.type === "phoneField" && (
                  <input
                    type="number"
                    name={fields.variable}
                    id={fields.variable}
                    required={fields.isRequired === "true"}
                    readOnly={fields.isReadOnly === "true"}
                  />
                )}
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

export default FormPage;
