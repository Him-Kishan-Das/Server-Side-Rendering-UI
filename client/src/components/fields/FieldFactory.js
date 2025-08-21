import React, { useEffect } from "react";
import PhoneField from "./PhoneField";
import TextField from "./TextField";
import TextView from "./TextView";
import DropDown from "./DropDown";
import DependencyDropdown from "./DependencyDropdown";
import SingleBoolRadio from "./SingleBoolRadio";
import CheckBoxRadio from "./CheckBoxRadio";
import Radio from "./Radio";
import Enclosure from "./Enclosure";

const FieldFactory = ({ field, value, onChange, formValues, onFieldChange }) => { // ADD formValues and onFieldChange
    useEffect(() => {
        console.log(value);
    })
    switch(field.type){
        case 'textfield':
            return <TextField field={field} value={value} onChange={onChange} />
        case 'phoneField':
            return <PhoneField field={field} value={value} onChange={onChange} />
        case 'textView':
            return <TextView field={field} value={value} />
        case 'dropdown':
            return <DropDown field={field} value={value} onChange={onChange} />
        case 'dependencyDropdown':
            return <DependencyDropdown field={field} value={value} onChange={onChange} formValues={formValues} /> // Passes formValues
        case 'singleBoolRadio':
            return <SingleBoolRadio field={field} value={value} onChange={onChange} formValues={formValues} onFieldChange={onFieldChange} /> // Passes formValues and onFieldChange
        case 'checkBoxRadio':
            return <CheckBoxRadio field={field} value={value} onChange={onChange} />;
        case 'radio':
            return <Radio field={field} value={value} onChange={onChange} />
        case 'enclosure':
            return <Enclosure field={field} value={value} onChange={onChange} />;
        default: 
            return <div>Unsupported field type: {field.type}</div>
        
    }
};

export default FieldFactory;