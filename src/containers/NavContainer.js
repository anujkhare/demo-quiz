import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class NavContainer extends Component {
  render() {
    return (
      <div>
        <IndexLink to="/">Home</IndexLink>
        {' | '}
        <Link to="/fuel-savings">Demo App</Link>
        {' | '}
        <Link to="/about">About</Link>
        <br/>
      </div>
    );

  }
}
  

// NavContainer.propTypes = {
// };

export default NavContainer;
