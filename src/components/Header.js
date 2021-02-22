import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Calorie Tracker</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            <Link to="/" className="nav-item active">
              <div className="nav-link">Home</div>
            </Link>
            <Link to="/yourday/1" className="nav-item active">
              <div className="nav-link">Your Day</div>
            </Link>
            <Link to="/calendar" className="nav-item active">
              <div className="nav-link">Calendar</div>
            </Link>
            <Link to="/stats" className="nav-item active">
              <div className="nav-link">Stats</div>
            </Link>
        </ul>
      </div>
    </nav>
  )
}

export default Header;