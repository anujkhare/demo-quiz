import React, { Component, PropTypes } from 'react';
// import { Link, IndexLink } from 'react-router';

import NavContainer from '../containers/NavContainer.js';
import StatusContainer from '../containers/StatusContainer.js';

class App extends Component {
  render() {
    return (
      <div>
        <NavContainer />
        <StatusContainer />
        {this.props.children}
      </div>
    );

  }
}
  

App.propTypes = {
  children: PropTypes.element
};

export default App;
