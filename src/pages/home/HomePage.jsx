import React, { useEffect, useState } from 'react';
import axios from 'axios';


const HomePage = () => {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/rre/api/v1/highlights')
      .then(response => {
        // Sort highlights by date in descending order (newest first)
        const sorted = response.data.sort((a, b) => new Date(b.highlightDate) - new Date(a.highlightDate));
  
        // Limit to the first three records
        setHighlights(sorted.slice(0, 3));
      })
      .catch(error => {
        console.error('Error fetching highlights:', error);
      });
  }, []);
  


  return (
    <>

      {/* Hero Section */}
      <header className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1>Welcome to RRE</h1>
          <p className="lead">Your ultimate hub for race results and highlights.</p>
          <a href="/results" className="btn btn-primary btn-lg mt-3">View Race Results</a>
        </div>
      </header>

      {/* Latest Highlights */}
      <div className="row pt-5">
      {highlights.map(highlight => (
      <div className="col-md-4 d-flex align-items-stretch" key={highlight.highlightID}>
      <div className="card mb-4 w-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{highlight.highlightHeading}</h5>
          <p className="card-text flex-grow-1">{highlight.highlightDescription}</p>
        </div>
      </div>
    </div>
  ))}
  </div>


    </>
  );
};

export default HomePage;
