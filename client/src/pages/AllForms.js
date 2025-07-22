import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './styles/AllForms.css';

const AllForms = () => {
  const [forms, setForms] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    totalForms: 0,
    formsPerPage: 10,
    hasNextPage: false,
    hasPreviousPage: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(searchParams.get('page')) || 1;

  const fetchForms = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const baseURL = process.env.REACT_APP_API_BASE_URL;
      const response = await axios.get(`${baseURL}/forms?page=${page}&limit=10`);
      
      if (response.data && response.data.success) {
        setForms(response.data.data);
        setPagination({
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
          totalForms: response.data.totalForms,
          formsPerPage: response.data.formsPerPage,
          hasNextPage: response.data.hasNextPage,
          hasPreviousPage: response.data.hasPreviousPage
        });
      } else {
        throw new Error(response.data.message || 'Invalid data format from API');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch forms. Please try again later.');
      console.error('Error fetching forms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms(page);
  }, [page]);

  const handleProceed = (form) => {
    navigate(`/forms/service/${form.service_id}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      navigate(`?page=${newPage}`);
    }
  };

  return (
    <div className="forms-container">
      <h2>Forms List</h2>
      <div className="forms-header">
        <span>Total Forms: {pagination.totalForms}</span>
      </div>
      
      {loading && <div className="loading">Loading forms...</div>}
      {error && <div className="error-message">{error}</div>}
      
      <div className="forms-list">
        {forms.map((form) => (
          <div key={form._id} className="form-card">
            <div className="form-info">
              <h3>{form.formName || 'Unnamed Form'}</h3>
              <div className="form-meta">
                <p>Service ID: {form.service_id || 'N/A'}</p>
                <p>Department: {form.department_id || 'N/A'}</p>
                <p>Version: {form.version || '1.0'}</p>
                <p>Status: {form.is_active ? 'Active' : 'Inactive'}</p>
              </div>
            </div>
            <button 
              onClick={() => handleProceed(form)}
              className="proceed-btn"
            >
              Proceed
            </button>
          </div>
        ))}
      </div>
      
      {!loading && pagination.totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPreviousPage}
            className="pagination-btn"
          >
            Previous
          </button>
          
          <span className="page-indicator">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllForms;