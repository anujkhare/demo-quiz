import React, {PropTypes, Component} from 'react';
// import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// import * as questionActions from '../actions/questionAction';
// import * as selectionActions from '../actions/selectionAction';
import QuestionBox from '../components/QuestionBox';
import AnswerForm from '../components/AnswerForm';

const proptypes = {
  //dispatch: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired
};

class QuizContainer extends Component {
  render() {
    return (
      <div>
        <QuestionBox {...this.props} />
        <AnswerForm {...this.props} />
      </div>
    );
  }
}

QuizContainer.PropTypes = proptypes;
  
function mapStateToProps(state) {
  const {question, selection} = state;
  console.log("QuizContainer!");
  console.log(question);
  console.log(selection);
  return {
    question: question,
    selection: selection
  };
}

export default connect(
  mapStateToProps
)(QuizContainer);
