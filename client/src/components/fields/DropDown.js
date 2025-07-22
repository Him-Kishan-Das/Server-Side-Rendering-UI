import React from "react";

const DropDown = ({field}) => {
    return (
        <select
                    name={field.variable}
                    id={field.variable}
                    required={field.isRequired === "true"}
                  >
                    <option value="">Option 1</option>
                  </select>
    )
}

export default DropDown;