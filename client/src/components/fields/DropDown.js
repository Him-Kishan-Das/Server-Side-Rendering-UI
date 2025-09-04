import React, { useState, useEffect } from "react";

const DropDown = ({ field, value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const bearerToken = process.env.REACT_APP_BEARER_TOKEN;

  useEffect(() => {
    const fetchOptions = async () => {
      if (!field.endpoint || !field.endpoint.getUri) {
        setOptions([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      const uri = field.endpoint.getUri;

      try {
        const response = await fetch(uri, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Assuming your API returns an object with keys and values
        if (data.data && typeof data.data === "object") {
          const formattedOptions = Object.keys(data.data).map((key) => ({
            value: key,
            label: data.data[key],
          }));
          setOptions(formattedOptions);
        } else {
          setOptions([]);
          console.error(
            "API response data is not in the expected format:",
            data
          );
        }
      } catch (e) {
        console.error("Failed to fetch dropdown options:", e);
        setError("Failed to load options.");
      } finally {
        setIsLoading(false);
      }
    };

    // Trigger fetch only if a new endpoint is specified
    fetchOptions();
  }, [field.endpoint, field.variable]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <select
        name={field.variable}
        id={field.variable}
        required={field.isRequired === "true"}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">--Select--</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
