import React from "react";

const FormReset = ({ button, onReset }) => {
    return (
        <button 
            type="button" 
            className="nav-btn" 
            id={button.type}
            onClick={onReset}
        >
                        {button?.enLabel 
  ?? button?.lnLabel?.en 
  ?? button?.lnLabel?.enLabel 
  ?? (typeof button?.lnLabel === "string" ? button.lnLabel : "") 
  ?? ""
}
        </button>
    )
}

export default FormReset;