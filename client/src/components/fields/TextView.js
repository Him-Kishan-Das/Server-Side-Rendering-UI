import React, { useState, useEffect } from "react";
import axios from 'axios';

const TextView = ({ field, formValues }) => {
    const [displayValue, setDisplayValue] = useState(field.value || 'N/A');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const bearerToken = process.env.REACT_APP_BEARER_TOKEN;

    useEffect(() => {
        const fetchTextViewData = async () => {
            if (field.endpoint && field.dependencies && field.dependencies.length > 0) {
                const allDependenciesMet = field.dependencies.every(dep => formValues[dep]);

                if (allDependenciesMet) {
                    setIsLoading(true);
                    setError(null);

                    let uri = field.endpoint.getUri;
                    field.dependencies.forEach(dep => {
                        uri = uri.replace(`${dep}_`, formValues[dep]);
                    });

                    try {
                        const response = await axios.get(uri, {
                            headers: {
                                Authorization: `Bearer ${bearerToken}`, 
                            },
                        });
                        
                        const fetchedData = response.data.data || response.data; 

                        const valueToDisplay = fetchedData[field.variable] || 'N/A';
                        setDisplayValue(valueToDisplay);
                    } catch (err) {
                        console.error(`Error fetching data for ${field.variable}:`, err);
                        setError('Failed to load data');
                        setDisplayValue('Error loading data');
                    } finally {
                        setIsLoading(false);
                    }
                } else {
                    setDisplayValue('Awaiting input...');
                    setError(null);
                    setIsLoading(false);
                }
            } else {
                setDisplayValue(field.value || 'N/A');
                setIsLoading(false);
                setError(null);
            }
        };

        fetchTextViewData();
    }, [formValues, field, bearerToken]); 

    return (
        <div className="text-view">
            {isLoading ? 'Loading...' : (error ? error : displayValue)}
        </div>
    );
};

export default TextView;
