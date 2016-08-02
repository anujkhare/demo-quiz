import React, {PropTypes} from 'react';

// This is a stateless functional component. (Also known as pure or dumb component)
// More info: https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components
// And https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d
// Props are being destructured below to extract the savings object to shorten calls within component.
const TotalScoreBox = ({totalScore}) => {
  return (
    <div id="totalScoreBox" className="box-status">
      <span className="status-heading">
        Total score <br/>
      </span>
      <span className="statusText">
        {totalScore}
      </span>
    </div>
  );
};

TotalScoreBox.propTypes = {
  totalScore: PropTypes.number.isRequired
};

export default TotalScoreBox;
