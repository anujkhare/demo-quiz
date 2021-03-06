import React, {Component, PropTypes} from 'react';

import { setSelection, toggleSelectionOption } from '../actions/selectionAction';
import submitAndFetch from '../actions/index';

const proptypes = {
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  selection: PropTypes.array.isRequired
};

class AnswerForm extends Component {
  constructor(props) {
    super(props);
 //    this.save = this.save.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSkip = this.onSkip.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
  }

  onSelectionChange(e) {
    const { dispatch, question } = this.props;
    if (question.correct[0] > 1)
      dispatch(toggleSelectionOption(e.target.value));
    else
      dispatch(setSelection([e.target.value]));
  }

  onSubmit(e) {
     const { dispatch } = this.props;
     e.preventDefault();
     if (!this.props.selection)   // must select at least one option
        return;

     dispatch(submitAndFetch());
  }

  onSkip(e) {
     const { dispatch } = this.props;
     e.preventDefault();

     dispatch(setSelection([]));  // set no selection (Skipping!)
     dispatch(submitAndFetch());
  }

  render() {
    const { question, selection } = this.props;
    const handleChange = this.onSelectionChange;
    const numCorrect = question.correct[0];
    return (
     <div className="answerBox box">
     <h2>
      Answer
     </h2>
     <h3>
      This question is of type: {(numCorrect > 1)? "Multiple correct": "Single correct"}
     </h3>
     <form className="answerForm" onSubmit={this.onSubmit}>
       <ul>
        {question.opt.map(option => {
           let inputType = (numCorrect > 1)? "checkbox": "radio";
           return (
             <li key={option.uid}>
             <div className="option">
               <input type={inputType}
                      name="input_option"
                      className={inputType}
                      value={option.uid}
                      checked={selection.indexOf(option.uid) != -1}
                      onChange={handleChange}
               />
               <label>
                 <span><span></span></span>
                 {option.str}
               </label>
             </div>
             </li>
           );
         })
        }
       </ul>
       <input type="submit" className="btn btn-colored" id="btnSubmitAnswer" value="Submit" />
       <input type="button" className="btn" id="btnSkipAnswer" value="Skip" onClick={this.onSkip} />
     </form>
     </div>
    );
  }
}

AnswerForm.propTypes = proptypes;

export default AnswerForm;
