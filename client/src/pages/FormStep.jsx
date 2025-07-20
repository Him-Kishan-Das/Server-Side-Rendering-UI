import React from "react";
import {useLocation, useNavigate, useParams } from 'react-router-dom';

const FormStep = () => {
    const { serviceId } = useParams();
    const {stepId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { stepData, formName, totalSteps, currentStep } = location.state || {};

    const handleNext = () => {
        if(currentStep < totalSteps){
            navigate(`/service/${serviceId}/step/${currentStep + 1}`, {
                state: {
                    stepData: {},
                    formName,
                    totalSteps,
                    currentStep: currentStep + 1
                }
            });
        }
    };

    if(!stepData){
        return <div>Loading step details...</div>
    }

    return (
        <>
            <div className="container">
                <h1>{formName}</h1>
                <h2>Step {currentStep}  of {totalSteps}: {stepData.header}</h2>

                <div className="step-content">
                    {stepData.intro && <p>{stepData.intro}</p>}

                    <div className="navigation-butons">
                        {currentStep > 1 && (
                            <button onClick={() => navigate(-1)}>Back</button>
                        )}
                        <button onClick={handleNext}>{currentStep === totalSteps ? "Submit" : "Next"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormStep;