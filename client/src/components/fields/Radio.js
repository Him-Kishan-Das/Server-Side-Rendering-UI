import React from "react";
import PropTypes from "prop-types";

const Radio = ({ field, value, onChange }) => {
  const handleChange = (selectedValue) => {
    // Convert to boolean if the value is 'true'/'false'
    const newValue = selectedValue === "true" ? true :
                    selectedValue === "false" ? false :
                    selectedValue;
    onChange(newValue);
  };

  return (
    <div className="radio-group">
      {field.mapOptions.map((option, index) => {
        const optionText = Object.keys(option)[0];
        const optionValue = option[optionText];
        
        return (
          <label key={index} className="radio-option">
            <input
              type="radio"
              name={field.variable}
              value={optionValue}
              checked={value === optionValue || value === optionValue.toString()}
              onChange={() => handleChange(optionValue)}
              required={field.isRequired}
              className="radio-input"
            />
            <span className="radio-label">{optionText}</span>
          </label>
        );
      })}
    </div>
  );
};

Radio.propTypes = {
  field: PropTypes.shape({
    variable: PropTypes.string.isRequired,
    mapOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    isRequired: PropTypes.bool,
  }).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
};

export default Radio;