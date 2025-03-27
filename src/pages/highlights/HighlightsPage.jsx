import React, { useEffect, useState } from 'react';
import axios from 'axios';


const HighlightsPage = () => {
  // State to hold all highlight items fetched from the backend
  const [highlights, setHighlights] = useState([]);

  // Fetch highlights from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/rre/api/v1/highlights')
      .then(response => {
        // Sort highlights by date in descending order (newest first)
        const sorted = response.data.sort((a, b) => new Date(b.highlightDate) - new Date(a.highlightDate));
        setHighlights(sorted);
      })
      .catch(error => {
        console.error('Error fetching highlights:', error);
      });
  }, []);

  return (
    <>


      {/* Highlights Section */}
      <div className="container mt-5">
        <h2>Race Highlights</h2>
        <div className="row">
          {highlights.map((highlight) => (
            <div className="col-md-6 mb-4" key={highlight.highlightID}>
              <div className="card h-100">
                {/* Dynamic Image */}
                <img 
                  src={highlight.highlightImagePath} 
                  className="card-img-top" 
                  alt={highlight.highlightHeading} 
                />
                <div className="card-body">
                  {/* Dynamic Heading & Description */}
                  <h5 className="card-title">{highlight.highlightHeading}</h5>
                  <p className="card-text">{highlight.highlightDescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default HighlightsPage;
