import React, {PropTypes} from 'react';

const TimeElapsedBox = ({timeElapsed}) => {
  timeElapsed = Math.ceil(timeElapsed);
  return (
    <div id="timeElapsedBox" className="box-status">
      <span className="status-heading">
        Time Elapsed <br/>
      </span>
      <span className="statusText">
        {Math.trunc(timeElapsed / 60)}:{timeElapsed % 60}
      </span>
    </div>
  );
};

TimeElapsedBox.propTypes = {
  timeElapsed: PropTypes.number.isRequired
};

export default TimeElapsedBox;
