import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Form.css";
import { FaLock } from "react-icons/fa";

const Form = () => {
  const { serviceId } = useParams();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;
        console.log("Base URL:", baseURL);
        const response = await axios.get(`${baseURL}/forms/service/${serviceId}`);
        setFormData(response.data[0]);
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (serviceId) {
      fetchFormData();
    }
  }, [serviceId]);


  const navigate = useNavigate();

  const handleProceed = () => {
    if(formData.steps && formData.steps.length > 0){
      const firstStep = formData.steps[0];

      if(firstStep.isLock?.initVale === true){
        alert("This form is currently locked and cannot be accessed.");
        return;
      }

      navigate(`/service/${serviceId}/step/1`,{
        state: {
          setpData: firstStep,
          formName: formData.formName,
          totalSteps: formData.steps.length,
          currentStep: 1
        }
      });
    }
  };

  if (formData === null) {
    return <div className="container">Loading form...</div>;
  }

  const formName = formData.formName ? formData.formName.trim() : null;
  const description = formData.description ? formData.description.trim() : null;
  const formType = formData.type ? formData.type.trim() : null;

  return (
    <div className="container">
      <h1 className="formName">{formName}</h1>
      <p className="description">{description}</p>

      {formType === "stepper" && (
        <div className="stepper-content">
          <h2>Step-by-step Process</h2>

          {formData.steps && formData.steps.length > 0 ? (
            <div className="stepper-cards-container">
              {formData.steps.map((step, index) => (
                <div className="stepper-card" key={index}>
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                  <h3>
  {step.header
    ? typeof step.header === "object"
      ? step.header.en || Object.values(step.header)[0] // Prefer English, else first available
      : step.header
    : ""}
</h3>
                    {step.intro && <p>{step.intro}</p>}
                  </div>
                  {step.isLock?.initVale && (
                    <div className="lock-icon">
                      <FaLock />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No Steps defined for this stepper form</p>
          )}
        </div>
      )}

      <button className="proceed" onClick={handleProceed}>Proceed to Apply</button>
    </div>
  );
};

export default Form;