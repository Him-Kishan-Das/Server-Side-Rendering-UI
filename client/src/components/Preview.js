import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Preview = ({ endpoint }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoint.getUri);
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load preview data');
        console.error('Preview fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint?.getUri) {
      fetchPreviewData();
    }
  }, [endpoint]);

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

  return (
    <div className="preview-container">
      <h2>Application Preview</h2>
      <p className="preview-intro">
        Review your application. If needed, you can go back and make changes.
      </p>

      {data && (
        <div className="preview-details">
          {/* Personal Information Section */}
          <div className="preview-section">
            <h3>Personal Information</h3>
            <div className="preview-row">
              <span className="preview-label">Name:</span>
              <span className="preview-value">{data.candidateName || 'N/A'}</span>
            </div>
            <div className="preview-row">
              <span className="preview-label">Registration No:</span>
              <span className="preview-value">{data.ahsec_reg_no || 'N/A'}</span>
            </div>
            {/* Add more fields as needed */}
          </div>

          {/* Institution Details Section */}
          <div className="preview-section">
            <h3>Institution Details</h3>
            <div className="preview-row">
              <span className="preview-label">Institution Name:</span>
              <span className="preview-value">{data.ahsec_inst_name || 'N/A'}</span>
            </div>
            <div className="preview-row">
              <span className="preview-label">Year of Passing:</span>
              <span className="preview-value">{data.ahsec_yearofpassing || 'N/A'}</span>
            </div>
          </div>

          {/* Documents Section */}
          {data.enclosures && (
            <div className="preview-section">
              <h3>Uploaded Documents</h3>
              <div className="document-grid">
                {data.enclosures.map((doc, index) => (
                  <div key={index} className="document-item">
                    <span className="document-label">{doc.type}:</span>
                    {doc.url ? (
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="document-link">
                        View Document
                      </a>
                    ) : (
                      <span className="document-missing">Not uploaded</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="preview-actions">
        <button className="preview-back-button">Back to Edit</button>
        <button className="preview-submit-button">Submit Application</button>
      </div>
    </div>
  );
};

export default Preview;