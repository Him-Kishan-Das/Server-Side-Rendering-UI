import React from "react";
import  './styles/CheckBoxRadio.css';

const CheckBoxRadio = ({ field, value = [], onChange }) => {

  const selectedValues = Array.isArray(value) ? value : [];

  const handleChange = (optionValue) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue) 
      : [...selectedValues, optionValue];

    onChange(newValues);
  };

  return (
    <div className="checkbox-group">
      {field.mapOptions.map((option, index) => {
        const optionText = Object.keys(option)[0];
        const optionValue = option[optionText];
        const isChecked = selectedValues.includes(optionValue);

        return (
          <label key={index} className="checkbox-option">
            <input
              type="checkbox"
              name={field.variable}
              value={optionValue}
              checked={isChecked}
              onChange={() => handleChange(optionValue)}
              className="checkbox-input"
            />
            <span className="checkbox-label">
              {optionText}
              {isChecked && (
                <span className="checkbox-description"> - {option[optionText]}</span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default CheckBoxRadio;