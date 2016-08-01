import React, {PropTypes} from 'react';

// time is always in seconds
const TimeLeftBox = ({timeLeft}) => {
  timeLeft = Math.floor(timeLeft);
  return (
    <div id="timeLeftBox" className="box-status">
      <span className="status-heading">
        Time Left <br/>
      </span>
      <span className="timeLeftSpan">
        {Math.trunc(timeLeft / 60.0)}:{timeLeft % 60}
      </span>
    </div>
  );
};

TimeLeftBox.propTypes = {
  timeLeft: PropTypes.number.isRequired
};

export default TimeLeftBox;
