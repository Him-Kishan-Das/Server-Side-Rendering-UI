import React, { useState, useEffect } from "react";
import axios from "axios";

const DependencyDropdown = ({ field, value, onChange, formValues }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(field.dependenciesMet && field.endpoint){
            fetchOptions();
        }
    }, [formValues, field.dependenciesMet]);

    const fetchOptions = async () => {
        try {
            setLoading(true);
            let uri = field.endpoint.getUri;

            field.dependencies.forEach(dep => {
                uri = uri.replace(`${dep}_`, formValues[dep] || '');
            });

            const response = await axios.get(uri);
            setOptions(response.data);

        } catch (error) {
            console.error("Error fetching dependent options.", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <select
        name={field.variable}
        id={field.variable}
        required={field.isRequired}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading || !field.dependenciesMet}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );

};

export default DependencyDropdown;