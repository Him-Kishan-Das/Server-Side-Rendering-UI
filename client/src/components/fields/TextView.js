import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios for API calls

const TextView = ({ field, formValues }) => {
    const [displayValue, setDisplayValue] = useState(field.value || 'N/A');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const bearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTU2Njc2MzksImV4cCI6MTc1NjI3MjQzOSwidHlwZSI6ImFjY2VzcyIsImRldmljZV9pZCI6IjY5NzAyMDQwMWJlYzMwYTcwMzgxNzk2MTU1N2YwMzc4NjRhMjU0MTVlMmQ1YjEzN2ZlODA2NmUyOTM2NjY1YTMiLCJzdWIiOiI2N2ExZDMwMGM2MzkyZjk4ODkwNWY4OTIiLCJrZXkiOiJlRmh6VVFVemNVeXc5eVVhTmciLCJkYXRhIjp7Im5hbWUiOiIiLCJlbWFpbCI6IiIsIm1vYmlsZSI6Ijc2MzYwNTQwNzQiLCJnZW5kZXIiOiJNIiwiZG9iIjoiMTcvMDEvMjAwMCIsInVzZXJuYW1lIjoianlvdGlta2FzaHlhcCIsInVzZXJJZCI6IjY3YTFkMzAwYzYzOTJmOTg4OTA1Zjg5MiIsInVzZXJUeXBlIjoidXNlciIsImlzTG9nZ2VkSW4iOnRydWUsInVzZXJfdXVpZCI6IiIsInNld2FzZXR1X3VzZXJpZCI6IjgxSFM3Si1TUy0yMDI1LTU0MDc0LTE3NDg1MDk5NzczMzAiLCJteWFwcGxzX21vYmlsZSI6Ijc2MzYwNTQwNzQiLCJsb2dpbkRldmljZVR5cGUiOiJXIn0sImNhZGRyZXNzIjoiTVRreUxqRTJPQzR4TVM0M05BPT0ifQ.GA8MB1IrYJmAXSkMpMtYWbDTkyVCzs4B-PEgSuhpbXI";

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
