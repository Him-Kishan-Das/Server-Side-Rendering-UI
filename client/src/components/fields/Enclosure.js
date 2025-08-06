import React, { useState, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './styles/Enclosure.css';

const Enclosure = ({ field, value, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value || '');
  const [error, setError] = useState(null);

  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (field.docType && !file.type.match(field.docType)) {
      setError(`Invalid file type. Expected: ${field.docType}`);
      return;
    }

    if (field.fileSize && file.size > field.fileSize) {
      setError(`File too large. Max size: ${field.fileSize / 1000}KB`);
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewUrl(e.target.result);
        reader.readAsDataURL(file);
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('variable', field.variable);
      formData.append('encKeyType', field.encKeyType);

      const response = await axios.post(
        field.endpoint.postUri,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      onChange(response.data.filePath);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  }, [field, onChange]);

  const handleRemove = () => {
    setPreviewUrl('');
    onChange('');
  };

  return (
    <div className="enclosure-container">
      <label className="enclosure-label">
        {field.enLabel}
        {field.isRequired && <span className="required-asterisk">*</span>}
      </label>
      
      {previewUrl ? (
        <div className="preview-container">
          {field.docType.startsWith('image/') ? (
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="image-preview"
            />
          ) : (
            <a 
              href={previewUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="file-link"
            >
              View Uploaded File
            </a>
          )}
          <button 
            type="button" 
            onClick={handleRemove}
            className="remove-button"
            disabled={isUploading}
          >
            Remove
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
          <label htmlFor={field.variable} className="upload-label">
            {isUploading ? 'Uploading...' : 'Choose File'}
          </label>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
      
      {field.encKeyValue && (
        <div className="file-description">{field.encKeyValue}</div>
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