import React, {PropTypes} from 'react';

// time is always in seconds
const ScoringBox = ({positive, negative}) => {
  return (
      <div id="scoringBox" className="box">
        <h2> Scoring </h2>
        <par>
          Correct answer: <span className="color-positive"> +{positive} </span> <br />
        </par>
        <par>
          Incorrect answer: <span className="color-negative"> -{negative} </span><br />
        </par>
        <par>
          Skip question: <span className="color-normal"> 0.0 </span>
        </par>
      </div>
  );
};

ScoringBox.propTypes = {
  positive: PropTypes.number.isRequired,
  negative: PropTypes.number.isRequired
};

export default ScoringBox;
