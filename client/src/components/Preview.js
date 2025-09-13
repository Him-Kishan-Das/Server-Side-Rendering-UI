import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
        setApiData(response.data);
      } catch (err) {
        setError(err.message || "Failed to load preview data from API");
        console.error("Preview fetch error from API:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPreviewDataFromApi();
  }, [endpoint]);

  const handleBackToEdit = () => {
    navigate(`/service/${serviceId}/step/1`);
  };

  // Helper to get the field definition from the form structure
  const getFieldDefinition = (variable) => {
    if (!formStructure || !formStructure.steps) return null;
    for (const step of formStructure.steps) {
      if (step.formData) {
        const field = step.formData.find((f) => f.variable === variable);
        if (field) return field;
      }
    }
    return null;
  };

  // Updated getLabel for fields (inline, no utils)
  const getLabel = (variable) => {
    const field = getFieldDefinition(variable);
    if (field && field.label) {
      return field.label.enLabel
        ?? field.label.en
        ?? field.label.asLabel
        ?? field.label.as
        ?? (typeof field.label === "string" ? field.label : "");
    }
    return variable.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Updated getHeader for steps (inline, no utils)
  const getHeader = (header) => {
    if (!header) return "";
    return header.en
      ?? header.enLabel
      ?? header.as
      ?? header.asLabel
      ?? (typeof header === "string" ? header : "");
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
        // In case label is also an object (old/new)
        const label = selectedOption.label;
        return label?.enLabel
          ?? label?.en
          ?? label?.asLabel
          ?? label?.as
          ?? (typeof label === "string" ? label : Object.values(selectedOption)[0]);
      }
    }

    // If value is an object with language keys, show English or fallback
    if (value && typeof value === "object") {
      return value.enLabel
        ?? value.en
        ?? value.asLabel
        ?? value.as
        ?? (typeof value === "string" ? value : Object.values(value)[0]);
    }
    return value || "N/A";
  };

  if (loading && !formStructure) {
    return (
      <div className="preview-loading">
        <div className="spinner"></div>
        <p>Loading application details...</p>
      </div>
    );
  }

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
        // Use step.header as object or string
        groupedFields[getHeader(step.header)] = step.formData.map(
          (field) => field.variable
        );
      }
    });
  }

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
            const value =
              formValues[variable] !== undefined
                ? formValues[variable]
                : apiData?.data?.[variable];
            const formatted = formatValue(variable, value);
            const fieldDefinition = getFieldDefinition(variable);

            // Special handling for enclosure (documents) fields
            if (fieldDefinition?.type === "enclosure") {
              const docPath =
                formValues[variable] || apiData?.data?.enclosures?.[variable];
              const previewUrlBase = "http://localhost:5000/uploads";
              const normalizedDocPath = docPath?.replace(/\\/g, "/");
              const finalDocPath = normalizedDocPath?.startsWith("uploads/")
                ? normalizedDocPath.replace(/^uploads\//, "")
                : normalizedDocPath;
              return (
                <div key={fieldIndex} className="preview-row document-item">
                  <span className="preview-label">{label}:</span>
                  {finalDocPath ? (
                    <a
                      href={`${previewUrlBase}/${finalDocPath}`}
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