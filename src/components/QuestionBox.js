import React, {Component, PropTypes} from 'react';

import ScoringBox from './ScoringBox';

const proptypes = {
  question: PropTypes.object.isRequired,
};

class QuestionBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { question } = this.props;
    return (
     <div className="flex-ques-score-container">
      <div id="questionBox" className="box">
        <h2>
         Question
        </h2>
        <div>
          {(typeof question.id == 'undefined')? "Please wait while the question loads..": question.str}
        </div>
      </div>

      <ScoringBox positive={question.positive} negative={question.negative} />
     </div>
    );
  }
}

QuestionBox.propTypes = proptypes;

export default QuestionBox;
