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
  serviceId 
}) => {
  const handleClick = async () => {
    if (isLocked) {
      alert("This step is locked. Please complete previous steps.");
      return;
    }

    if (button.endpoint?.requiredKeys) {
      const missingFields = button.endpoint.requiredKeys.filter(
        key => !formValues?.[key]
      );
      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }
    }

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

        const requestData = { 
          user_id: "user123", 
          service_id: serviceId,
          formData: formValues
        };

        const response = await axios({
          method: button.endpoint.type.toLowerCase(),
          url: uriToUse.replace(/(\w+)_/g, (match, p1) =>
            formValues?.[p1] || match
          ),
          data: requestData
        });

        if (isLastStep) {
          onSubmit(response.data); // Final submission
        } else {
          onProceed(response.data); // Move to next step
        }
      } else {
        if (isLastStep) {
          onSubmit(); // Final submission
        } else {
          onProceed(); // Move to next step
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
      disabled={isLocked || (button.endpoint?.requiredKeys && !draftValue)}
    >
      {isLastStep ? "Submit" : button.enLabel || "Proceed"}
    </button>
  );
};

export default PostNavBtn;