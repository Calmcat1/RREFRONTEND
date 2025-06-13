import React, { useEffect, useState } from 'react';
import { fetchHighlights } from '../../services/api';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const loadHighlights = async () => {
      try {
        const data = await fetchHighlights();
        console.log("Fetched data:", data); // Add this for debugging in production
  
        if (Array.isArray(data)) {
          setHighlights(data.slice(0, 3));
        } else {
          console.error("Expected array but got:", data);
          setHighlights([]); // fallback
        }
      } catch (error) {
        console.error("Error fetching highlights:", error);
        setHighlights([]);
      }
    };

    loadHighlights();
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
         {/* Add image if it exists */}
          <img
            src={`http://localhost:8080${highlight.highlightImagePath}`}
            className="card-img-top"
            alt={highlight.highlightHeading}
          />
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
