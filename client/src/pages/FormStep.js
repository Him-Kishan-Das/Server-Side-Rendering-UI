import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormData from "../components/FormData";
import Preview from "../components/Preview";
import Payment from "../components/Payment";
import axios from "axios";
import { FaLock, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./styles/FormStep.css";
import NavigationButtons from "../components/NavigationButtons";

const FormStep = () => {
  const { serviceId, stepId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [currentStepData, setCurrentStepData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [formDraftValue, setFormDraftValue] = useState({});

  const userId = "user123";
  const currentStepIndex = parseInt(stepId) - 1;

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
          navigate(`/service/${serviceId}/step/1`);
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [serviceId, stepId, navigate]);


  useEffect(() => {
    const fetchDraftData = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(`${baseURL}/application/?user_id=${userId}&service_id=${serviceId}`);
        const data = await response.data;
        setFormDraftValue(data);
        
        if (data?.steps?.[currentStepIndex]) {
          setFormValues(prev => ({
            ...prev,
            ...data.steps[currentStepIndex]
          }));
        }
      } catch (error) {
        console.error('Error fetching draft data: ', error);
      } 
    };

    fetchDraftData();
  }, [userId, serviceId, currentStepIndex]);

  const handleFieldChange = (fieldName, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [fieldName]: value
    }));
  };

  const handleBack = () => {
    const prevStepId = parseInt(stepId) - 1;
    if (prevStepId >= 1) {
      navigate(`/service/${serviceId}/step/${prevStepId}`);
    } else {
      console.log("Already on the first step.");
    }
  };

  const handleNext = (responseData) => {
    console.log("Proceeding to next step with response data:", responseData);

    const nextStepId = parseInt(stepId) + 1;
    if (formData?.steps?.[nextStepId - 1]) {
      navigate(`/service/${serviceId}/step/${nextStepId}`);
    } else {
      console.log("No next step found. End of form.");
    }
  };

  const handleSubmit = (responseData) => {
    console.log("Final form submitted with response:", responseData);
    alert("Form Submitted Successfully!");
  };

  const handleReset = () => {
    setFormValues({}); 
    alert("Form has been reset!");
  };

  if (loading) {
    return <div>Loading form...</div>;
  }

  if (!formData || !currentStepData) {
    return <div>Error: Form data not loaded.</div>;
  }

  // Determine if the current step is locked based on the JSON's 'isLock' and 'draftValueCheck'
  // If 'draftValueCheck' is present, the step is locked if that specific field's value is falsy
  // If 'draftValueCheck' is NOT present, it falls back to 'initVale'
  const isCurrentStepLocked = currentStepData?.isLock?.draftValueCheck
    ? !formValues?.[currentStepData.isLock.draftValueCheck]
    : currentStepData?.isLock?.initVale === true;

  return (
    <div className="form-step-container">
      <div className="form-step-header">
        <h1>{formData?.formName}</h1>
        <h2>{currentStepData.header}</h2>
        <p className="intro-text">{currentStepData.intro}</p>
      </div>
      <div className="form-content">
        <div className="form-section">
          {currentStepData.stepType === "FormPage" && (
            <FormData
              stepData={currentStepData}
              formFields={currentStepData.formData}
              formValues={formValues}
              onFieldChange={handleFieldChange}
              formDraftValue={formDraftValue}
              currentStep={currentStepIndex}
            />
          )}
          {currentStepData.stepType === "Preview" && (
            <Preview 
            endpoint={currentStepData.endpoint} 
            formValues={formValues} 
            formStructure={formData} 
          />
          )}
          {currentStepData.stepType === "Payment" && (
            <Payment stepData={currentStepData} />
          )}
        </div>
      </div>

      <div className="navigation-buttons-container">
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
            currentStepFields={currentStepData.formData} 
            isCurrentStepLocked={isCurrentStepLocked}
          />
        )}
      </div>
    </div>
  );
};

export default FormStep;