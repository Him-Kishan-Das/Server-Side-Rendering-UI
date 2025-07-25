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
  const [formValues, setFormValues] = useState({});

  const userId = "user123";

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true); 
        const baseURL = process.env.REACT_APP_API_BASE_URL;

        const formResponse = await axios.get(
          `${baseURL}/forms/service/${serviceId}`
        );
        const fetchedFormData = formResponse.data[0];
        setFormData(fetchedFormData);

        const stepIndex = parseInt(stepId) - 1;
        if (fetchedFormData?.steps?.[stepIndex]) {
          setCurrentStepData(fetchedFormData.steps[stepIndex]);
        } else {
          console.warn(`Step data not found for stepId: ${stepId}`);
          setLoading(false);
          return; 
        }

        const applicationAPI = fetchedFormData?.endPoint?.gettUri;

        if (applicationAPI) {
          try {
            const applicationResponse = await axios.get(
              `${applicationAPI}?user_id=${userId}&service_id=${serviceId}`
            );

            // Log the response from the application GET URI
            console.log("Response from application GET URI:", applicationResponse.data);

            if (applicationResponse.data && applicationResponse.data.formData) {
              setFormValues(applicationResponse.data.formData);
            }
          } catch (appError) {
            if (appError.response && appError.response.status === 404) {
              console.info("No existing application found for this user and service. Starting fresh.");
            } else {
              // Log the error for the application data fetch
              console.error("Error fetching user application data from dynamic getUri:", appError.response ? appError.response.data : appError.message);
            }
          }
        } else {
          console.warn("No 'gettUri' found in formData.endPoint. Cannot fetch existing application data.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial form or application data:", error);
        setLoading(false); 
      }
    };

    fetchAllData();
  }, [serviceId, stepId]);


  const isStepLocked = currentStepData?.isLock?.initVale === true;
  // const dratValueCheck = currentStepData?.isLock?.draftValueCheck;

  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = (responseData) => {
    const nextStep = parseInt(stepId) + 1;
    if(nextStep <= formData.steps.length){
      navigate(`/service/${serviceId}/step/${nextStep}`);
    }
  };

  const handleReset = () => {
    setFormValues({});
  };

  const handleNext = () => {
    if(isStepLocked){
      alert("this step is locked. Please complete previous steps.");
      return;
    }

    const nextStep = parseInt(stepId) + 1;
    if (nextStep <= formData.steps.length) {
      const nextStepData = formData.steps[nextStep - 1];
      if(nextStepData?.isLock?.initVale === true){
        alert("The next step is currently locked.");
        return;
      }
      navigate(`/service/${serviceId}/step/${nextStep}`);
    }

    else if(formData?.steps && parseInt(stepId) == formData.steps.length){
      console.log("Reached last step. Handle final submission or just navigate away.");
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
              formFields={currentStepData.formData} 
              formValues={formValues}
              onFieldChange={handleFieldChange}
              />
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
              formValues={formValues}
              onBack={handleBack}
              onSubmit={handleSubmit}
              onReset={handleReset}
              onProceed={handleNext}
              serviceId={serviceId}
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