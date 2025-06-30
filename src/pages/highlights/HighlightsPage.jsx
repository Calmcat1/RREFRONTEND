import React, { useEffect, useState } from 'react';
import { fetchHighlights } from '../../services/api';


const API_BASE_URL = import.meta.env.VITE_API_URL;

const HighlightsPage = () => {
  const [highlights, setHighlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); //v2 loading page
  const highlightsPerPage = 2;

  // fetches highlights
  useEffect(() => {
    const loadHighlights = async () => {
      try {
        const data = await fetchHighlights();
        setHighlights(data);
      } catch (error) {
        console.error('Failed to fetch highlights', error);
      } finally {
        setLoading(false); // <-- stop loading no matter what
      }
    };
    loadHighlights();
  }, []);


  // after pagination, scrolls to the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Pagination logic
  const indexOfLastHighlight = currentPage * highlightsPerPage;
  const indexOfFirstHighlight = indexOfLastHighlight - highlightsPerPage;
  const currentHighlights = highlights.slice(indexOfFirstHighlight, indexOfLastHighlight);
  const totalPages = Math.ceil(highlights.length / highlightsPerPage);

   // If loading, show loader
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading... please wait while the server starts</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Race Highlights</h2>
      <div className="row">
        {currentHighlights.map((highlight) => (
          <div className="col-md-6 mb-4" key={highlight.highlightID}>
            <div className="card h-100">
             {/* Add image if it exists */}
                <img
                  src={`https://rre-1.onrender.com${highlight.highlightImagePath}`}
                  className="card-img-top"
                  alt={highlight.highlightHeading}
                />
              <div className="card-body w-75">
                <h5 className="card-title">{highlight.highlightHeading}</h5>
                <p className="card-text">{highlight.highlightDescription}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls text-center mt-3">
          <button 
            className="btn btn-outline-primary me-2 rre-button-general-1"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button 
            className="btn btn-outline-primary ms-2 rre-button-general-1"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Forward
          </button>
        </div>
      )}
    </div>
  );
};

export default HighlightsPage;