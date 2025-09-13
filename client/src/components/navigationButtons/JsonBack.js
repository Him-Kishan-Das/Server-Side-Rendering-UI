import React from "react";

const JsonBack = ({ button, onBack }) => {
    return (
        <button 
            type="button" 
            className="nav-button" 
            id={button.type}
            onClick={onBack}
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

export default JsonBack;