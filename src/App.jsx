import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./pages/home/HomePage";
import RaceResultsPage from "./pages/results/ResultsPage";
import HighlightsPage from "./pages/highlights/HighlightsPage";
import ContactPage from "./pages/contact/ContactPage";

function App() {
  return (
    <Router>
      {/* Navbar will be displayed on every page */}
      <Navbar />

      {/* Routes section */}
      <main className="container mx-auto p-4">
        <Routes>
          
          <Route path="/home" element={<HomePage />} />
          <Route path="/results" element={<RaceResultsPage />} />
          <Route path="/highlights" element={<HighlightsPage />} />
          <Route path="/contact" element={<ContactPage />} />

        </Routes>  
      </main>

      {/* Footer will be displayed on every page */}
      <Footer />
    </Router>
  );
}

export default App;
