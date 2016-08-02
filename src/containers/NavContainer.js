import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class NavContainer extends Component {
  render() {
    return (
      <div className="header" >
        <div className="navPad" />
        <div id="nav-title">
          <IndexLink to="/" className="nav-text">
            Demo Quiz App
          </IndexLink>
        </div>
        <div className="nav-links">
          <IndexLink to="/" className="nav-text">Quiz page</IndexLink>
        </div>
        <div className="nav-links">
          <Link to="/info" className="nav-text">Instructions</Link>
        </div>
        <div className="nav-links">
          <Link to="/about" className="nav-text">About</Link>
        </div>
      </div>
    );

  }
}

export default NavContainer;
