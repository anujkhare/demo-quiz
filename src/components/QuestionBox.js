import React, {Component, PropTypes} from 'react';

const proptypes = {
  question: PropTypes.object.isRequired,
};

class QuestionBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("questionbox");
    const { question } = this.props;
    return (
     <div>
      <h2>
       Question
      </h2>
      <div>
        {(typeof question.id == 'undefined')? "Please wait while the question loads..": question.str}
      </div>

      <div id="scoringBox" className="box">
        <h2> Scoring </h2>
        <par>
          Correct answer: <span className="color-positive"> +{question.positive} </span> <br />
        </par>
        <par>
          Incorrect answer: <span className="color-negative"> -{question.negative} </span><br />
        </par>
        <par>
          Skip question: <span className="color-normal"> 0.0 </span>
        </par>
      </div>
     </div>
    );
  }
}

QuestionBox.propTypes = proptypes;

export default QuestionBox;
