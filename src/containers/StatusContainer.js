import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';

import LastScoreBox from '../components/LastScoreBox';
import TotalScoreBox from '../components/TotalScoreBox';
import TimeElapsedBox from '../components/TimeElapsedBox';
import TimeLeftBox from '../components/TimeLeftBox';
import {getTimeServer} from '../actions/timeAction';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.object.isRequired,
  time: PropTypes.object.isRequired
};

class StatusContainer extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getTimeServer());
    // recalculate and render the new time
    this.intervalRender = setInterval(this.forceUpdate.bind(this), 500);
    // Sync the time with the server
    this.intervalSyncTime = setInterval(dispatch(getTimeServer()));
  }

  componentWillUnmount() {
    clearInterval(this.intervalRender);
    clearInterval(this.intervalSyncTime);
  }

  render() {
    const {time} = this.props;
    let timeDiff = new Date().getTime() - time.startedAt;
    timeDiff = timeDiff / 1000; // convert to seconds
    let timeElapsed = time.timeElapsed + timeDiff;
    let timeLeft = time.timeLeft - timeDiff;
    if (typeof time.timeElapsed == 'undefined') {
      timeElapsed = 0;
      timeLeft = 0;
    }
      
    return (
      <div id="scoreBox" className="flex-score-container">
        <TotalScoreBox totalScore={this.props.score.totalScore} />
        <LastScoreBox lastScore={this.props.score.lastScore} />
        <TimeElapsedBox timeElapsed={timeElapsed} />
        <TimeLeftBox timeLeft={timeLeft} />
      </div>
    );
  }
}

StatusContainer.propTypes = propTypes;

function mapStateToProps(state) {
  console.log(state);
  const {score, time} = state;
  return {
    score,
    time
  };
}

export default connect(
  mapStateToProps
)(StatusContainer);
