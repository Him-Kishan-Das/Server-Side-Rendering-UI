import React from "react";
import PhoneField from "./PhoneField";
import TextField from "./TextField";
import TextView from "./TextView";
import DropDown from "./DropDown";

const FieldFactory = ({field, value, onChange}) => {
    switch(field.type){
        case 'textfield':
            return <TextField field={field} value={value} onChange={onChange} />
        case 'phoneField':
            return <PhoneField field={field} value={value} onChange={onChange} />
        case 'textView':
            return <TextView field={field} value={value} />
        case 'dropdown':
            return <DropDown field={field} value={value} onChange={onChange} />
        default: 
            return <div>Unsupported field type: {field.type}</div>
        
    }
};

export default FieldFactory;