import React, { useEffect } from "react";
import SystemBack from "./navigationButtons/SystemBack";
import PostNavBtn from "./navigationButtons/PostNavBtn";
import FormReset from "./navigationButtons/FormReset";
import JsonBack from "./navigationButtons/JsonBack";
import './styles/NavigationButtons.css'

const NavigationButtons = ({ stepData, navButtons, formValues, onBack, onSubmit, onReset }) => {

  if(!navButtons || !Array.isArray(navButtons)){
    return null;
  }

  return (
    <>
      <div className="navigation-buttons">
        {navButtons.map((button, index) => {
          const commonProps = {
            key: index,
            button,
            formValues,
            isLocked: stepData?.isLock?.initVale === true,
            draftValue: stepData?.isLock?.draftValueCheck 
              ? formValues?.[stepData.isLock.draftValueCheck] 
              : null
          };
          switch (button.type) {
            case "system_back":
              return <SystemBack {...commonProps} onBack={onBack} />;
            case "post_nav_btn":
              return <PostNavBtn {...commonProps} onSubmit={onSubmit} />;
            case "form_reset":
              return <FormReset {...commonProps} onReset={onReset} />;
            case "json_back":
              return <JsonBack {...commonProps} onBack={onBack} />;
            default:
              return null;
          }
        })}
      </div>
    </>
  );
};

export default NavigationButtons;
