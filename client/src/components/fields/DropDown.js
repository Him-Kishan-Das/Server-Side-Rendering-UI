import React from "react";

const DropDown = ({field, value, onChange }) => {
    return (
        <select
                    name={field.variable}
                    id={field.variable}
                    required={field.isRequired === "true"}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                  >
                    <option value="option 1">Option 1</option>
                    <option value="option 2">Option 2</option>
                    <option value="option 3">Option 3</option>
                  </select>
    )
}

export default DropDown;