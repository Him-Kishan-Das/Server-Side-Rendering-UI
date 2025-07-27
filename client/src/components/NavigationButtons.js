// In NavigationButtons.js

import React from "react"; // Removed useEffect as it's not used directly here
import SystemBack from "./navigationButtons/SystemBack";
import PostNavBtn from "./navigationButtons/PostNavBtn";
import FormReset from "./navigationButtons/FormReset";
import JsonBack from "./navigationButtons/JsonBack";
import './styles/NavigationButtons.css'

const NavigationButtons = ({ stepData, navButtons, formValues, onBack, onSubmit, onReset, onProceed, serviceId, currentStepFields, isCurrentStepLocked }) => {
  // Corrected 'ArrayOf' to 'Array.isArray'
  if (!navButtons || !Array.isArray(navButtons)) {
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
            isLocked: isCurrentStepLocked, // Using the isCurrentStepLocked prop
            draftValue: stepData?.isLock?.draftValueCheck
              ? formValues?.[stepData.isLock.draftValueCheck]
              : null
          };
          switch (button.type) {
            case "system_back":
              return <SystemBack {...commonProps} onBack={onBack} />;
            case "post_nav_btn":
              return (
                <PostNavBtn
                  {...commonProps}
                  onSubmit={onSubmit}
                  onProceed={onProceed}
                  serviceId={serviceId}
                  currentStepFields={currentStepFields} // Passing currentStepFields
                />
              );
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