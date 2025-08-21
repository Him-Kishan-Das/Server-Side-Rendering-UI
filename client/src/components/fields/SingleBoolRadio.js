import React from "react";

const SingleBoolRadio = ({ field, value, onChange, formValues, onFieldChange }) => {
    const handleChange = (val) => {
        onChange(val);

        if(val === "true" && field.onDuplicate){
            Object.entries(field.onDuplicate).forEach(([src, dest]) => {
                onFieldChange(dest, formValues[src]); // Correct way to update another field
            });
        }
    };

    return (
        <div>
            {field.mapOptions.map((option) => {
                const key = Object.keys(option)[0];
                const val = option[key];
                return (
                    <label key={val}>
                        <input
                            type="radio"
                            name={field.variable}
                            value={val}
                            checked={value === val}
                            onChange={() => handleChange(val)}
                            required={field.isRequired}
                        />
                        {key}
                    </label>
                );
            })}
        </div>
    )
}

export default SingleBoolRadio;