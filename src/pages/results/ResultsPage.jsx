import React, { useEffect, useState } from 'react';
import { fetchRaceResults } from '../../services/api';
import './ResultsPage.css';

export default function RaceResultsPage() {
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true); //v2 loading page
    const [currentPage, setCurrentPage] = useState(1);
    const [visible, setVisible] = useState(false); //updated for table load in
    const recordsPerPage = 10;
    

// updated useffect for data sorting
  useEffect(() => {
  const loadRaceResults = async () => {
    try {
      const data = await fetchRaceResults();
      const raceArray = Array.isArray(data)
        ? data
        : Array.isArray(data.results)
          ? data.results
          : [];
      setResults(raceArray);
    } catch (error) {
      console.error('Failed to fetch race results:', error);
    } finally {
      setLoading(false);  // always hide loader after attempt
      setVisible(true) // table slides int
    }
  };

  loadRaceResults();
}, []);




    // after pagination, scrolls to the top of the page
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Filter results based on search query
    const filteredResults = results.filter(result =>
        result.driverName?.toLowerCase().includes(search.toLowerCase()) ||
        result.garageName?.toLowerCase().includes(search.toLowerCase()) ||
        (result.raceResultYear && new Date(result.raceResultYear).getFullYear().toString().includes(search))
    );

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredResults.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredResults.length / recordsPerPage);

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
            <h2 className="text-center">Race Results</h2>

            {/* Search Bar */}
            <div className="row mb-3">
                <div className="col-md-4 offset-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search driver or team or Year..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1); // Reset to page 1 when searching
                        }}
                        disabled={loading}
                    />
                </div>
            </div>

            {/* Loading Spinner */}
            <div className={`results-wrapper ${!loading ? 'visible' : ''}`}>
                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Results Table */}
                        <div className="table-container">
                        <table className="table table-striped table-bordered mt-4 table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Driver Position</th>
                                    <th>Garage Name</th>
                                    <th>Driver Car No</th>
                                    <th>Driver Name</th>
                                    <th>Garage Speciality</th>
                                    <th>Event Year</th>
                                    <th>Driver Best Time</th>
                                    <th>Event Name</th>
                                    <th>Event Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.length > 0 ? (
                                    currentRecords.map((result, idx) => (
                                        <tr key={idx}>
                                            <td>{result.raceResultRank}</td>
                                            <td>{result.driverName}</td>
                                            <td>{result.raceResultCarNo}</td>
                                            <td>{result.garageName}</td>
                                            <td>{result.garageSpeciality}</td>
                                            <td>{result.raceResultYear ? new Date(result.raceResultYear).getFullYear() : 'N/A'}</td>
                                            <td>{result.raceResultBestTime}s</td>
                                            <td>{result.raceResultEvent}</td>
                                            <td>{result.raceResultEventActivity}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center">No results found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
                    </>
                )}
            </div>
        </div>
    );
}
