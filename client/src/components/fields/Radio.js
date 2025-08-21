import React from "react";
import PropTypes from "prop-types";

const Radio = ({ field, value, onChange }) => {
  const handleChange = (selectedValue) => {
    onChange(selectedValue);
  };

  return (
    <div className="radio-group">
      {field.mapOptions.map((option, index) => {
        const storedValue = Object.keys(option)[0]; 
        const displayLabel = option[storedValue];

        return (
          <label key={index} className="radio-option">
            <input
              type="radio"
              name={field.variable}
              value={storedValue}
              checked={value === storedValue}
              onChange={() => handleChange(storedValue)}
              required={field.isRequired}
              className="radio-input"
            />
            {/* Add a non-breaking space here */}
            &nbsp;<span className="radio-label">{displayLabel}</span> 
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