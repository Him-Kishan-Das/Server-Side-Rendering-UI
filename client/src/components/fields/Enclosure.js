import React, { useState, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FiUpload, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import './styles/Enclosure.css';

const Enclosure = ({ field, value, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value || '');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset states
    setError(null);
    setSuccess(false);

    // Validate file type
    if (field.docType && !file.type.match(field.docType)) {
      setError(`Invalid file type. Please upload a ${field.docType.split('/')[1].toUpperCase()} file`);
      return;
    }

    // Validate file size
    if (field.fileSize && file.size > field.fileSize) {
      setError(`File too large. Maximum size is ${field.fileSize / 1000}KB`);
      return;
    }

    try {
      setIsUploading(true);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewUrl(e.target.result);
        reader.readAsDataURL(file);
      }

      // Prepare form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('variable', field.variable);
      formData.append('encKeyType', field.encKeyType);

      // Upload file
      const response = await axios.post(
        field.endpoint.postUri,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            // You can add progress tracking here if needed
          }
        }
      );

      onChange(response.data.filePath);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  }, [field, onChange]);

  const handleRemove = () => {
    setPreviewUrl('');
    onChange('');
    setSuccess(false);
    setError(null);
  };

  return (
    <div className={`enclosure-container ${error ? 'error-state' : ''} ${success ? 'success-state' : ''}`}>
      <div className="enclosure-header">
        <label className="enclosure-label">
          {field.enLabel}
          {field.isRequired && <span className="required-asterisk">*</span>}
        </label>
        {field.encKeyValue && (
          <p className="file-description">{field.encKeyValue}</p>
        )}
      </div>

      {previewUrl ? (
        <div className="preview-wrapper">
          <div className="preview-container">
            {field.docType.startsWith('image/') ? (
              <img 
                src={previewUrl} 
                alt="Upload preview" 
                className="image-preview"
              />
            ) : (
              <div className="file-preview">
                <div className="file-icon">PDF</div>
                <a 
                  href={previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="file-link"
                >
                  View Document
                </a>
              </div>
            )}
          </div>
          <button 
            type="button" 
            onClick={handleRemove}
            className="remove-button"
            disabled={isUploading}
          >
            <FiX className="icon" /> Remove
          </button>
        </div>
      ) : (
        <div className="upload-area">
          <input
            type="file"
            id={field.variable}
            accept={field.docType}
            onChange={handleFileChange}
            disabled={isUploading}
            className="file-input"
          />
          <label htmlFor={field.variable} className={`upload-label ${isUploading ? 'uploading' : ''}`}>
            {isUploading ? (
              <>
                <span className="spinner"></span> Uploading...
              </>
            ) : (
              <>
                <FiUpload className="icon" /> Choose File
              </>
            )}
          </label>
          <p className="hint-text">Supports: {field.docType}, Max: {field.fileSize / 1000}KB</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <FiAlertCircle className="icon" /> {error}
        </div>
      )}

      {success && (
        <div className="success-message">
          <FiCheck className="icon" /> File uploaded successfully
        </div>
      )}
    </div>
  );
};

Enclosure.propTypes = {
  field: PropTypes.shape({
    variable: PropTypes.string.isRequired,
    enLabel: PropTypes.string.isRequired,
    docType: PropTypes.string,
    fileSize: PropTypes.number,
    endpoint: PropTypes.shape({
      postUri: PropTypes.string.isRequired
    }).isRequired,
    encKeyType: PropTypes.string,
    encKeyValue: PropTypes.string,
    isRequired: PropTypes.bool
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Enclosure;