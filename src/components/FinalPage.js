import React, {PropTypes} from 'react';

const propTypes = {
  totalScore: PropTypes.number.isRequired
};

// Since this component is simple and static, there's no parent container for it.
const FinalPage = ({totalScore}) => {
  return (
    <div className="box infobox">
      <h2 className="alt-header">Done!</h2>
      <p>
        Thank you for taking the quiz!
      </p>
      <p style={{fontColor: "red"}}>
        Your final score was: {totalScore}
      </p>
      <p>
        Source is available on <a href="http://github.com/anujkhare/demo-quiz"> Github </a>.
      </p>
      <p>
        Retake the quiz with any of "user1" ... "user20".
      </p>
    </div>
  );
};

FinalPage.propTypes = propTypes;

export default FinalPage;
