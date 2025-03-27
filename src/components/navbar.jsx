import React from 'react';


export default function navbar(){
 return(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
        <a className="navbar-brand" href="#">RRE</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item"><a className="nav-link" href="home">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="results">Results</a></li>
                <li className="nav-item"><a className="nav-link" href="highlights">Highlights</a></li>
                <li className="nav-item"><a className="nav-link active" href="contact">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>
 );
}