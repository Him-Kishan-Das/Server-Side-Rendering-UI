import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Add these imports
import "./styles/Preview.css";

const Preview = ({ endpoint, formValues, formStructure }) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { serviceId } = useParams();

  useEffect(() => {
    const fetchPreviewDataFromApi = async () => {
      if (!endpoint?.getUri) {
        setError("No API endpoint provided for preview.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(endpoint.getUri);

        // --- CONSOLE LOG THE API RESPONSE HERE ---
        console.log(
          "API Response for Preview Data (from endpoint):",
          response.data
        );
        // ------------------------------------------

        setApiData(response.data); // Store API response if needed
      } catch (err) {
        setError(err.message || "Failed to load preview data from API");
        console.error("Preview fetch error from API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewDataFromApi();
  }, [endpoint]);

  // Handler for the Back to Edit button
  const handleBackToEdit = () => {
    navigate(`/service/${serviceId}/step/1`);
  };

  // Helper to get the field definition from the form structure
  const getFieldDefinition = (variable) => {
    if (!formStructure || !formStructure.steps) return null;
    for (const step of formStructure.steps) {
      if (step.formData) {
        const field = step.formData.find((f) => f.variable === variable);
        if (field) {
          return field;
        }
      }
    }
    return null;
  };

  const getLabel = (variable) => {
    const field = getFieldDefinition(variable);
    if (field && field.label?.en) {
      return field.label.en;
    }
    return variable.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatValue = (variable, value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (variable === "is_pp_address_same") {
      return value === "true" ? "Yes" : "No";
    }
    if (variable === "is_within_without_country") {
      return value === "true" ? "Within India" : "Outside India";
    }

    const field = getFieldDefinition(variable);
    if (field?.type === "dropdown" || field?.type === "dependencyDropdown") {
      const selectedOption =
        (field.options || []).find((opt) => opt.value === value) ||
        (field.mapOptions || []).find((opt) => Object.keys(opt)[0] === value);
      if (selectedOption) {
        return selectedOption.label?.en || Object.values(selectedOption)[0];
      }
    }

    return value || "N/A";
  };

  // If initial loading of form structure or form values is not complete
  if (loading && !formStructure) {
    return (
      <div className="preview-loading">
        <div className="spinner"></div>
        <p>Loading application details...</p>
      </div>
    );
  }

  // If there's an error from the API call, and no formValues to display, show error.
  if (error && Object.keys(formValues).length === 0) {
    return (
      <div className="preview-error">
        <h2>Error Loading Preview</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Group fields by step headers from the formStructure
  const groupedFields = {};
  if (formStructure && formStructure.steps) {
    formStructure.steps.forEach((step) => {
      if (step.formData) {
        groupedFields[step.header] = step.formData.map(
          (field) => field.variable
        );
      }
    });
  }

  // If no form values are available, and no API data for fallback, show message
  if (Object.keys(formValues).length === 0 && !apiData) {
    return (
      <div className="preview-empty">
        <p>No application data available to preview.</p>
      </div>
    );
  }

  return (
    <div className="preview-container">
      <h2>Application Preview</h2>
      <p className="preview-intro">
        Review your application. If needed, you can go back and make changes.
      </p>

      {Object.keys(groupedFields).map((header, sectionIndex) => (
        <div key={sectionIndex} className="preview-section">
          <h3>{header}</h3>
          {groupedFields[header].map((variable, fieldIndex) => {
            const label = getLabel(variable);
            // Prioritize formValues, then fall back to apiData if available
            const value =
              formValues[variable] !== undefined
                ? formValues[variable]
                : apiData?.data?.[variable];
            const formatted = formatValue(variable, value);
            const fieldDefinition = getFieldDefinition(variable); // Get the full field definition

            // Special handling for enclosure (documents) fields
            if (fieldDefinition?.type === "enclosure") {
              // Get the document path either from formValues or apiData
              const docPath =
                formValues[variable] || apiData?.data?.enclosures?.[variable];

              // Define the base URL explicitly
              const previewUrlBase = "http://localhost:5000/uploads"; // Base URL should point to /uploads

              // Normalize the docPath by replacing backslashes with forward slashes
              const normalizedDocPath = docPath?.replace(/\\/g, "/"); // Replace \ with /

              // Remove redundant "uploads/" if it exists in the normalized path
              const finalDocPath = normalizedDocPath?.startsWith("uploads/")
                ? normalizedDocPath.replace(/^uploads\//, "") // Remove the "uploads/" prefix if it exists
                : normalizedDocPath;

              return (
                <div key={fieldIndex} className="preview-row document-item">
                  <span className="preview-label">{label}:</span>
                  {finalDocPath ? (
                    <a
                      href={`${previewUrlBase}/${finalDocPath}`} // Combine the base URL and the final path
                      target="_blank"
                      rel="noopener noreferrer"
                      className="document-link"
                    >
                      View Document
                    </a>
                  ) : (
                    <span className="document-missing">Not uploaded</span>
                  )}
                </div>
              );
            }
            // Do not display regular fields that are empty or have no value
            if (value === undefined || value === null || value === "") {
              return null;
            }

            return (
              <div key={fieldIndex} className="preview-row">
                <span className="preview-label">{label}:</span>
                <span className="preview-value">{formatted}</span>
              </div>
            );
          })}
        </div>
      ))}

      <div className="preview-actions">
        <button className="preview-back-button" onClick={handleBackToEdit}>
          Back to Edit
        </button>
        <button className="preview-submit-button">Submit Application</button>
      </div>
    </div>
  );
};

Preview.propTypes = {
  endpoint: PropTypes.shape({
    getUri: PropTypes.string,
  }),
  formValues: PropTypes.object.isRequired,
  formStructure: PropTypes.object.isRequired,
};

export default Preview;
