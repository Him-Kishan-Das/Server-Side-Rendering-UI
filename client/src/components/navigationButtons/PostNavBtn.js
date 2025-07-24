import axios from "axios";
import React from "react";

const PostNavBtn = ({ 
  button, 
  formValues, 
  onSubmit, 
  isLocked, 
  draftValue,
  isLastStep,
  onProceed 
}) => {
  const handleClick = async () => {
    if (isLocked) {
      alert("This step is locked. Please complete previous steps.");
      return;
    }

    // Check if draftValueCheck condition is met
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
      // Handle API call if endpoint exists
      if (button.endpoint) {
        const response = await axios({
          method: button.endpoint.type.toLowerCase(),
          url: button.endpoint.getUri.replace(/(\w+)_/g, (match, p1) => 
            formValues?.[p1] || match
          ),
          data: formValues
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