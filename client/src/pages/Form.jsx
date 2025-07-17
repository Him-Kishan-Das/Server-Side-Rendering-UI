import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles/Form.css";

const Form = () => {
  const { serviceId } = useParams(); // Extract serviceId from URL
  const [formData, setFormData] = useState([]); // Use empty array

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

  if (FormData === null){
    return <div className="container">Loading form...</div>;
  }

  const formName = formData.formName ? formData.formName.trim() : null;
  const description = formData.description ? formData.description.trim() : null;
  const formType = formData.type ? formData.type.trim() : null;
  console.log(formType);

  return (
    <div className="container">
      <h1 className="formName">{formName}</h1>
      <p className="description">{description}</p>


      {formType === "stepper" && (
        <div className="stepper-content">
          <h2>Step-by-step Process</h2>

          {formData.steps && formData.steps.length > 0 ? (
            <ol className="stepper-list">

              {formData.steps.map((step, index) => (
                <li className="stepper-step" key={index}>
                  <h3>{index + 1}</h3>
                  <p>{step.header}</p>
                </li>
              ))}

            </ol>
          ) :
          <p>No Steps defined for this stepper form</p>
          }
        </div>
      )}

      <button className="proceed">Proceed to Apply</button>
    </div>
  );
};

export default Form;
