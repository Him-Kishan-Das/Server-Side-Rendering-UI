import React, { useState, useEffect } from "react";
import axios from "axios";

const DependencyDropdown = ({ field, value, onChange, formValues }) => {
    const bearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NTU2Njc2MzksImV4cCI6MTc1NjI3MjQzOSwidHlwZSI6ImFjY2VzcyIsImRldmljZV9pZCI6IjY5NzAyMDQwMWJlYzMwYTcwMzgxNzk2MTU1N2YwMzc4NjRhMjU0MTVlMmQ1YjEzN2ZlODA2NmUyOTM2NjY1YTMiLCJzdWIiOiI2N2ExZDMwMGM2MzkyZjk4ODkwNWY4OTIiLCJrZXkiOiJlRmh6VVFVemNVeXc5eVVhTmciLCJkYXRhIjp7Im5hbWUiOiIiLCJlbWFpbCI6IiIsIm1vYmlsZSI6Ijc2MzYwNTQwNzQiLCJnZW5kZXIiOiJNIiwiZG9iIjoiMTcvMDEvMjAwMCIsInVzZXJuYW1lIjoianlvdGlta2FzaHlhcCIsInVzZXJJZCI6IjY3YTFkMzAwYzYzOTJmOTg4OTA1Zjg5MiIsInVzZXJUeXBlIjoidXNlciIsImlzTG9nZ2VkSW4iOnRydWUsInVzZXJfdXVpZCI6IiIsInNld2FzZXR1X3VzZXJpZCI6IjgxSFM3Si1TUy0yMDI1LTU0MDc0LTE3NDg1MDk5NzczMzAiLCJteWFwcGxzX21vYmlsZSI6Ijc2MzYwNTQwNzQiLCJsb2dpbkRldmljZVR5cGUiOiJXIn0sImNhZGRyZXNzIjoiTVRreUxqRTJPQzR4TVM0M05BPT0ifQ.GA8MB1IrYJmAXSkMpMtYWbDTkyVCzs4B-PEgSuhpbXI";
    
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // This function will check if the dependencies are met, including ruleDeps
    const checkDependenciesMet = () => {
        if (!field || !formValues) {
            return false;
        }

        // Check for basic dependencies
        const allDependenciesHaveValues = (field.dependencies || []).every(dep => formValues[dep]);
        
        // Check for rule-based dependencies
        const ruleDependenciesMet = Object.keys(field.ruleDeps || {}).every(depKey => {
            const requiredValues = field.ruleDeps[depKey];
            const currentValue = formValues[depKey];
            return requiredValues.includes(currentValue);
        });

        return allDependenciesHaveValues && ruleDependenciesMet;
    };

    useEffect(() => {
        const dependenciesMet = checkDependenciesMet();
        if (dependenciesMet && field.endpoint) {
            fetchOptions();
        } else {
            setOptions([]); // Clear options if dependencies are not met
        }
    }, [formValues, field, bearerToken]);

    const fetchOptions = async () => {
        try {
            setLoading(true);
            setError(null);
            let uri = field.endpoint.getUri;

            // Replace simple dependencies in the URI
            (field.dependencies || []).forEach(dep => {
                const depValue = formValues[dep];
                uri = uri.replace(`${dep}_`, depValue || '');
            });
            
            // Replace rule-based dependencies in the URI (if any)
            Object.keys(field.ruleDeps || {}).forEach(depKey => {
                const depValue = formValues[depKey];
                uri = uri.replace(`${depKey}_`, depValue || '');
            });

            if (uri.includes('_')) {
                console.error("URI contains unreplaced placeholders:", uri);
                setError("Failed to load options. Missing dependency values.");
                setLoading(false);
                return;
            }

            const response = await axios.get(uri, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            });
            
            if (response.data && response.data.data && typeof response.data.data === 'object') {
                const formattedOptions = Object.keys(response.data.data).map(key => ({
                    value: key,
                    label: response.data.data[key]
                }));
                setOptions(formattedOptions);
            } else {
                setOptions([]);
                console.error("API response format is not as expected:", response.data);
                setError("Failed to load options. Invalid API response.");
            }

        } catch (error) {
            console.error("Error fetching dependent options.", error);
            setError("Failed to load options. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const isDependenciesMet = checkDependenciesMet();
    return (
        <select
            name={field.variable}
            id={field.variable}
            required={field.isRequired === true}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={loading || !isDependenciesMet}
        >
            <option value="">
              {loading ? "Loading..." : "Select an option"}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default DependencyDropdown;