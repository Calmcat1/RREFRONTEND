import axios from 'axios';

const API_BASE_URL = 'https://8c0d-102-140-218-132.ngrok-free.app/rre/api/v1';

/**
 * Fetch highlights from the API.
 * @returns {Promise<Array>} Sorted list of highlights.
 */
export const fetchHighlights = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/highlights`);
        return response.data.sort((a, b) => new Date(b.highlightDate) - new Date(a.highlightDate)); // Sort descending
    } catch (error) {
        console.error("Error fetching highlights:", error);
        return [];
    }
};


/**
 * Fetch race results from the API.
 * @returns {Promise<Array>} Race results data.
 */
export const fetchRaceResults = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/race-results`);
        return response.data;
    } catch (error) {
        console.error("Error fetching race results:", error);
        return [];
    }
};
