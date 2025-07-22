import React from "react";
import PhoneField from "./PhoneField";
import TextField from "./TextField";
import TextView from "./TextView";
import DropDown from "./DropDown";

const FieldFactory = ({field}) => {
    switch(field.type){
        case 'textfield':
            return <TextField field={field}/>
        case 'phoneField':
            return <PhoneField field={field} />
        case 'textView':
            return <TextView field={field} />
        case 'dropdown':
            return <DropDown field={field} />
        default: 
            return <div>Unsupported field type: {field.type}</div>
        
    }
};

export default FieldFactory;