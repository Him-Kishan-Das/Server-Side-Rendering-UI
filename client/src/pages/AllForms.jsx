import React, { useEffect } from 'react';
import axios from 'axios';
import './styles/AllForms.css';

const AllForms = () => {
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
            
        </>
    );
};

export default AllForms;
