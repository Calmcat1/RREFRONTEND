import React from 'react';
import { Link } from 'react-router-dom';

export default function footer() {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-5">
            <p>© 2025 RRE. All rights reserved.</p>
            <p>
                <Link to="/privacy" className="text-white">Privacy Policy</Link> | 
                <Link to="/terms" className="text-white">Terms of Service</Link>
            </p>
            <p>
                <a href="https://instagram.com/rre_racing" target="_blank" rel="noopener noreferrer" className="text-white">Instagram</a>
            </p>
        </footer>
    );
}
