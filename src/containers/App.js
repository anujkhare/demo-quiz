import React, {Component, PropTypes} from 'react';
// import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';

import NavContainer from '../containers/NavContainer.js';
import StatusContainer from '../containers/StatusContainer.js';
import {getQuestionScore} from '../actions/index';

class App extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getQuestionScore());
  }
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
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.element
};

export default connect(
)(App);
// export default App;
