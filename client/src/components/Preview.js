import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './styles/Preview.css';

const Preview = ({ endpoint, formStructure }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      if (!endpoint?.getUri) {
        setError('No API endpoint provided for preview.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        // The API call is made without the Authorization header.
        const response = await axios.get(endpoint.getUri);
        
        // --- CONSOLE LOG THE API RESPONSE HERE ---
        console.log("API Response for Preview Data:", response.data);
        // ------------------------------------------

        setData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load preview data');
        console.error('Preview fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewData();
  }, [endpoint]);

  const getLabel = (variable) => {
    if (!formStructure || !formStructure.steps) return variable;
    for (const step of formStructure.steps) {
      if (step.formData) {
        const field = step.formData.find(f => f.variable === variable);
        if (field && field.label?.en) {
          return field.label.en;
        }
      }
    }
    return variable.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatValue = (variable, value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (variable === 'is_pp_address_same') {
      return value === 'true' ? 'Yes' : 'No';
    }
    if (variable === 'is_within_without_country') {
      return value === 'true' ? 'Within India' : 'Outside India';
    }
    
    if (formStructure && formStructure.steps) {
      for (const step of formStructure.steps) {
          if (step.formData) {
              const field = step.formData.find(f => f.variable === variable);
              if (field?.type === 'dropdown' || field?.type === 'dependencyDropdown') {
                  const selectedOption = (field.options || []).find(opt => opt.value === value) || 
                                         (field.mapOptions || []).find(opt => Object.keys(opt)[0] === value);
                  if (selectedOption) {
                      return selectedOption.label?.en || Object.values(selectedOption)[0];
                  }
              }
          }
      }
    }

    return value || 'N/A';
  };

  if (loading) {
    return (
      <div className="preview-loading">
        <div className="spinner"></div>
        <p>Loading application details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="preview-error">
        <h2>Error Loading Preview</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const formDataFromApi = data?.data || {};

  const groupedFields = {};
  if (formStructure && formStructure.steps) {
      formStructure.steps.forEach(step => {
        if (step.formData) {
          groupedFields[step.header] = step.formData.map(field => field.variable);
        }
      });
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
            const value = formDataFromApi[variable];
            const formatted = formatValue(variable, value);

            if (variable === 'photo_of_the_candidate' || variable === 'candidate_sign' || 
                variable === 'hs_marksheet' || variable === 'hs_reg_card') {
                const docPath = formDataFromApi.enclosures?.[variable];
                const previewUrlBase = "https://api.sewasetu.assam.statedatacenter.in/ahsec/v1/enclosure?file_path=";

                return (
                    <div key={fieldIndex} className="preview-row document-item">
                        <span className="preview-label">{label}:</span>
                        {docPath ? (
                            <a href={`${previewUrlBase}${docPath}`} target="_blank" rel="noopener noreferrer" className="document-link">
                                View Document
                            </a>
                        ) : (
                            <span className="document-missing">Not uploaded</span>
                        )}
                    </div>
                );
            }

            if (value === undefined || value === null || value === '') {
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
        <button className="preview-back-button">Back to Edit</button>
        <button className="preview-submit-button">Submit Application</button>
      </div>
    </div>
  );
};

Preview.propTypes = {
  endpoint: PropTypes.shape({
    getUri: PropTypes.string.isRequired,
  }).isRequired,
  formStructure: PropTypes.object.isRequired,
};

export default Preview;