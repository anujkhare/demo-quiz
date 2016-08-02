import React, {Component, PropTypes} from 'react';
// import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';

import {getQuestionScore} from '../actions/index';
import {setToken, authFromServer} from '../actions/envAction';
import NavContainer from '../containers/NavContainer.js';
import StatusContainer from '../containers/StatusContainer.js';
import LoginBox from '../components/LoginBox';
import FinalPage from '../components/FinalPage';

class App extends Component {
  componentDidMount() {
    this.renderContent = this.renderContent.bind(this);

    const {dispatch} = this.props;
    dispatch(getQuestionScore());
  }
  
  renderContent() {
    const {dispatch, env, children, score} = this.props;
    console.log("APP RENDER");
    console.log(env.quizStatus);
    switch(env.quizStatus) {
      case "InvalidToken":
        return (
          <LoginBox dispatchSetToken={(token) => dispatch(setToken(token))}
            env={env} authFromServer={() => dispatch(authFromServer())} />
        );

      case "OK":
        return (
          <div>
            <StatusContainer />
            <div id="content">
            {children}
           </div>
          </div>
        );

      case "QuizCompleted":
        return (
          <FinalPage totalScore={score.totalScore} />
        );
    }
  }
  
  render() {
    return (
      <div>
        <NavContainer />
        {this.renderContent()}
      </div>
    );

  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  env: PropTypes.object.isRequired,
  score: PropTypes.object.isRequired,
  children: PropTypes.element
};

function mapStateToProps(state) {
  const {env, score} = state;
  return {
    env,
    score
  };
}

export default connect(
  mapStateToProps
)(App);
