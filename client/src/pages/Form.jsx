import React, { useEffect } from "react";
import axios from "axios";
import "./styles/Form.css";

const Form = () => {
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const baseURL = process.env.REACT_APP_API_BASE_URL;
        console.log("Base URL:", baseURL);
        const response = await axios.get(`${baseURL}/forms/service/10010`);
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFormData();
  }, []);
  
  return (
    <>
      <div className="container">
        {/* formName */}
        <h1>Issuance of Migration Certificate</h1>
      </div>
    </>
  );
};

export default Form;
