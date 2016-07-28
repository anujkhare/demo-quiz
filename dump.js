////////////////////////////////////////////////
// answers
// The row which says type of the question
var AnswerTypeRow = React.createClass({

   render: function() {
     var answerType=this.props.answerType.toString();
     console.log(answerType);
     if (!answerType)
       answerType = "Loading questions, please wait..."
     else
       answerType="This question is of type: " + answerType
     console.log(answerType);
     // if then clause to show the number of answers or that message!
     return (
       <div className="answerTypeRow">
         <h4 className="commentAuthor">
           {answerType}
         </h4>
       </div>
     );
   }
});
// Individual options with the checkbox
// List of the options created
var OptionList = React.createClass({
  onRadioChange: function(e) {
    console.log("HHEHEHEHEH");
    console.log(e.target.value);
    this.props.onOptionChange(e);
  },

  render: function() {
    var callback = this.onRadioChange;
    var curValue = this.props.optionsSelected;
    var inputType = this.props.inputType;
    var optionNodes = this.props.data.map(function(option) {
       return (
          <li key={option.uid}>
          <div className="option">
            <input type={inputType}
                   name="input_option"
                   className="radio"
                   value={option.uid}
                   checked={option.uid == curValue}
                   onChange={callback}
            />
            <label>
              <span><span></span></span>
              {option.str}
            </label>
          </div>
          </li>
       );
    });
    return (
      <div className="commentList">
       <ul>
       {optionNodes}
       </ul>
      </div>
    );
  }
});
// The answer form overall: This should receive only one Options set
var AnswerForm = React.createClass({
   getInitialState: function() {
     return {optionsSelected: ['']};
   },

   handleOptionChange: function(e) {
     var newOptions;
     if (this.props.inputType == 'radio') {
       console.log("WERE FINE");
     } else {
       console.log("Well, we need to work");
     }
      console.log(e.target.value);
      this.setState({optionsSelected: e.target.value});
   },

   handleSubmit: function(e) {
     e.preventDefault();
     console.log("Submitting");
     if (!this.state.optionsSelected)
        return;
     this.props.onAnswerSubmit({opt: this.state.optionsSelected});
     this.setState({optionsSelected: ''});
   },
   handleSkip: function(e) {
     console.log("Skipping");
     this.props.onAnswerSubmit({opt: []});
     this.setState({optionsSelected: ''});
   },
   render: function() {
    console.log(this.props.inputType);
    console.log("form");
     return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <OptionList data={this.props.data} inputType={this.props.inputType} optionsSelected={this.state.optionsSelected} onOptionChange={this.handleOptionChange} />
        <input type="submit" className="btn btn-colored" id='btnSubmitAnswer' value="Submit" />
        <input type="button" className="btn" id='btnSkipAnswer' value="Skip" onClick={this.handleSkip} />
      </form>
     );
   }
});

// skip is just submit without any options selected
var AnswerBox = React.createClass({
  handleAnswerSubmit: function(opt) {
   if (!opt)
     return;
   this.props.onAnswerSubmit(opt);
  },
 render: function() {
   var options = this.props.options;
   if (!options) {
     return (
       <div className="answerBox box">
         <h2>Answers</h2>
         <AnswerTypeRow answerType=""/>
       </div>
    );
  }
  var numCorrect = this.props.numCorrect[0];
  var answerType = "Single Correct";
  var inputType = "radio";
  console.log(numCorrect);

  if (numCorrect > 1) {
     answerType = "Multiple correct";
     inputType = "checkbox";
  }

  return (
    <div className="answerBox box">
      <h2>Answers</h2>
      <AnswerTypeRow answerType={answerType}/>
      <AnswerForm data={this.props.options} onAnswerSubmit={this.handleAnswerSubmit} inputType={inputType}/>
    </div>
  );
  }
});
////////////////////////////////////////////////////////////////////////////////////////////
// ScoringBox
var ScoringBox = React.createClass({
 render: function() {
   return (
     <div id="scoringBox" className="box">
       <h2> Scoring </h2>
       <par>
         Correct answer: <span className="color-positive"> +{this.props.positive} </span> <br />
       </par>
       <par>
         Incorrect answer: <span className="color-negative"> -{this.props.negative} </span><br />
       </par>
       <par>
         Skip question: <span className="color-normal"> 0.0 </span>
       </par>
     </div>
   );
  }
});

// QuestionBox
var QuestionBox = React.createClass({
 render: function() {
   return (
     <div id="questionBox" className="box">
       <h2> Question </h2>
       {this.props.children.toString().toString().slice(2, -2)}
     </div>
   );
  }
});

///////////////////////////////////////////////////////////
// TotalScoreBox
var TotalScoreBox = React.createClass({
 // TODO: Children is an array!?
 render: function() {
   return (
     <div id="totalScoreBox" className="box-status">
       <span className="status-heading">
         Total score <br/>
       </span>
       <span className="totalScoreSpan">
         {this.props.children.toString().toString().slice(2, -2)}
       </span>
     </div>
   );
 }
});

// LastScoreBox
var LastScoreBox = React.createClass({
 render: function() {
   var lastScore = parseFloat(this.props.children.toString().slice(2, -2));    // FIXME
   var colorClass = "color-positive";
   console.log(lastScore);
   console.log(lastScore)
   if (lastScore < 0) {
     colorClass = "color-negative";
   } else if (lastScore == 0) {
     colorClass = "color-normal";
   }

   return (
     <div id="lastScoreBox" className="box-status">
       <span className="status-heading">
         Last score <br/>
       </span>
       <span className={colorClass}>
         {lastScore}
       </span>
     </div>
   );
 }
});

var ScoreBox = React.createClass({
 render: function() {
   return (
     <div id="scoreBox" className="flex-score-container">
       <TotalScoreBox> {this.props.totalScore} </TotalScoreBox>
       <LastScoreBox> {this.props.lastScore} </LastScoreBox>
     </div>
   );
  }
});

/////////////////////////////////////////////////////////////////
// Body
var QuestionPage = React.createClass({
   getInitialState: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(quesScore) {
        console.log("Sucess!");
        console.log(quesScore);
        if (!quesScore) {
          console.log("It's over!");
          // TODO: Show final something!
        }
        this.setState({question: quesScore.question, score: quesScore.score});
        console.log(JSON.stringify(quesScore));
        return {question: '', score: ''};
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("failed!");
        console.error(this.props.url, status, err.toString());
        return {question: '', score: ''};
      }.bind(this)
     });
     return {question: '', score: ''};
   },
  handleAnswerSubmit: function(opt) {
  //opt = {name: 'anuj khare', opt: ['1234', '11']};
  console.log(opt);
   $.ajax({
     url: this.props.url,
     dataType: 'json',
     type: 'POST',
     data: opt,
     success: function(quesScore) {
       console.log("Sucess!");
       console.log(quesScore);
        if (!quesScore) {
          console.log("It's over!");
          // TODO: Show final something!
        }
       this.setState({question: quesScore.question, score: quesScore.score});
     }.bind(this),
     error: function(xhr, status, err) {
       console.error(this.props.url, status, err.toString());
       // this.setState({data: comments});
     }.bind(this)
    });
  },

  render: function() {
   console.log("hey there!")
    return (
        <div>
          <div className="flex-status-container">
             <ScoreBox totalScore={this.state.score.totalScore} lastScore={this.state.score.lastScore} />
          </div>
          <div className="flex-ques-score-container">
              <QuestionBox> {this.state.question.str} </QuestionBox>
              <ScoringBox positive={this.state.question.positive} negative={this.state.question.negative} />
          </div>
          <div className="flex-answer-container">
            <AnswerBox options={this.state.question.opt} numCorrect={this.state.question.correct} onAnswerSubmit={this.handleAnswerSubmit} />
          </div>
        </div>
    );
  }
});

