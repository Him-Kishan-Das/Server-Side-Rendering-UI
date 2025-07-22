import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormData from "../components/FormData";
import Preview from "../components/Preview";
import Payment from "../components/Payment";
import axios from "axios";
import { FaLock, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./styles/FormStep.css"; // We'll create this CSS file
import NavigationButtons from "../components/NavigationButtons";

const FormStep = () => {
  const { serviceId, stepId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [currentStepData, setCurrentStepData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(
          `${baseURL}/forms/service/${serviceId}`
        );
        setFormData(response.data[0]);

        const stepIndex = parseInt(stepId) - 1;
        if (response.data[0]?.steps?.[stepIndex]) {
          setCurrentStepData(response.data[0].steps[stepIndex]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchFormData();
  }, [serviceId, stepId]);

  const handleNext = () => {
    const nextStep = parseInt(stepId) + 1;
    if (nextStep <= formData.steps.length) {
      navigate(`/service/${serviceId}/step/${nextStep}`);
    }
  };

  const handleBack = () => {
    const prevStep = parseInt(stepId) - 1;
    if (prevStep >= 1) {
      navigate(`/service/${serviceId}/step/${prevStep}`);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading step details...</div>;
  }

  if (!currentStepData) {
    return <div className="error-container">Step data not found</div>;
  }

  return (
    <div className="form-step-container">
      <div className="form-header">
        <h1 className="form-title">{formData?.formName}</h1>
        <p className="form-description">{formData?.description}</p>
        <div className="step-indicator">
          Step {stepId} of {formData?.steps?.length}
        </div>
      </div>

      <div className="step-card">
        <div className="step-header">
          <div className="step-number">{stepId}</div>
          <h2 className="step-title">{currentStepData.header}</h2>
          {currentStepData.isLock?.initVale && (
            <div className="lock-icon">
              <FaLock />
            </div>
          )}
        </div>

        <div className="step-content">
          {currentStepData.intro && <p className="step-intro">{currentStepData.intro}</p>}

          {currentStepData.documents && currentStepData.documents.length > 0 && (
            <div className="documents-section">
              <h3>Required Documents:</h3>
              <ul>
                {currentStepData.documents.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="step-component">
            {currentStepData.stepType === "FormPage" && (
              <FormData stepData={currentStepData} 
              formFields={currentStepData.formData} />
            )}
            {currentStepData.stepType === "Preview" && (
              <Preview stepData={currentStepData} />
            )}
            {currentStepData.stepType === "Payment" && (
              <Payment stepData={currentStepData} />
            )}
          </div>
        </div>

        <div className="navigation-buttons">


        {currentStepData.navigationButtons && (
            <NavigationButtons 
              stepData={currentStepData} 
              navButtons={currentStepData.navigationButtons} 
            />
          )}

          {parseInt(stepId) > 1 && (
            <button className="back-button" onClick={handleBack}>
              <FaArrowLeft /> Back
            </button>
          )}
          <button
            className={`next-button ${
              parseInt(stepId) === formData?.steps?.length ? "submit-button" : ""
            }`}
            onClick={handleNext}
          >
            {parseInt(stepId) === formData?.steps?.length ? "Submit" : "Next"} <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormStep;