import React, { useEffect, useState } from 'react';
import { fetchRaceResults } from '../../services/api';
import './ResultsPage.css';

export default function RaceResultsPage() {
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    useEffect(() => {
        const loadRaceResults = async () => {
            const data = await fetchRaceResults();
            setResults(data);
            setLoading(false);
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
        result.garageName?.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredResults.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredResults.length / recordsPerPage);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Race Results</h2>

            {/* Search Bar */}
            <div className="row mb-3">
                <div className="col-md-4 offset-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search driver or team..."
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
                                    <th>Driver Name</th>
                                    <th>Driver Car No</th>
                                    <th>Garage Name</th>
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
