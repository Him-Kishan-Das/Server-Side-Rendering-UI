// In PostNavBtn.js

import axios from "axios";
import React from "react";

const PostNavBtn = ({
  button,
  formValues,
  onSubmit,
  isLocked,
  draftValue, 
  isLastStep, 
  onProceed,
  serviceId,
  currentStepFields 
}) => {
  const handleClick = async () => {
    if (isLocked) {
      alert("This step is locked. Please complete previous steps.");
      return;
    }

    // REMOVED: The requiredKeys validation logic has been removed as per your request.
    // if (button.endpoint?.requiredKeys) {
    //   const missingFields = button.endpoint.requiredKeys.filter(
    //     key => !formValues?.[key]
    //   );
    //   if (missingFields.length > 0) {
    //     alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
    //     return;
    //   }
    // }

    try {
      if (button.endpoint) {
        let uriToUse;
        switch (button.endpoint.type) {
          case "GET":
            uriToUse = button.endpoint.getUri;
            break;
          case "POST":
            uriToUse = button.endpoint.postUri;
            break;
          case "PATCH":
            uriToUse = button.endpoint.patchUri;
            break;
          default:
            console.error("Unknown endpoint type:", button.endpoint.type);
            alert("Error: Unknown endpoint type.");
            return;
        }

        if (!uriToUse) {
          console.error(`URI is undefined for endpoint type: ${button.endpoint.type}`);
          alert("Error: API URL is missing for this action. Please check the form configuration.");
          return;
        }

        // 1. Construct stepSpecificData based on currentStepFields
        let stepSpecificData = {};
        if (currentStepFields && Array.isArray(currentStepFields)) {
          currentStepFields.forEach(field => {
            if (field.variable && formValues.hasOwnProperty(field.variable)) {
              stepSpecificData[field.variable] = formValues[field.variable];
            }
          });
        }
        
        // 2. Filter out keys specified in notIncludeKeys
        if (button.endpoint.notIncludeKeys && Array.isArray(button.endpoint.notIncludeKeys)) {
          button.endpoint.notIncludeKeys.forEach(key => {
            if (stepSpecificData.hasOwnProperty(key)) {
              delete stepSpecificData[key];
            }
          });
        }
        
        const requestData = {
          user_id: "user123", 
          service_id: serviceId, 
          formData: stepSpecificData 
        };

        // Replace URI placeholders (e.g., _doc_id_) using full formValues
        const finalUri = uriToUse.replace(/(\w+)_/g, (match, p1) =>
          formValues?.[p1] || match
        );

        const response = await axios({
          method: button.endpoint.type.toLowerCase(),
          url: finalUri,
          data: requestData
        });

        if (isLastStep) { 
          onSubmit(response.data); 
        } else {
          onProceed(response.data); 
        }
      } else {
        // Fallback if no endpoint is defined for the button
        if (isLastStep) {
          onSubmit(); 
        } else {
          onProceed(); 
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <button
      className={`nav-button post-nav-btn ${isLocked ? 'disabled' : ''}`}
      onClick={handleClick}
      disabled={isLocked}
    >
                  {button?.enLabel 
  ?? button?.lnLabel?.en 
  ?? button?.lnLabel?.enLabel 
  ?? (typeof button?.lnLabel === "string" ? button.lnLabel : "") 
  ?? ""
}
    </button>
  );
};

export default PostNavBtn;