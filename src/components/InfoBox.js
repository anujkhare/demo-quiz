import React from 'react';

const InfoBox = () => {
  return (
    <div className="box infobox">
      <h2>
        General
      </h2>
      <ol>
        <li> By taking this quiz, you agree not to discuss/post the questions shown here. </li>
        <li> The duration of the quiz is 2 mins. Timing would be clearly shown. </li>
        <li> Once you start the quiz, the timer would not stop, irrespective of any client side issues. </li>
        <li> Questions can have single or multiple correct answers. They will be shown accordingly. </li>
        <li> Your total score and the time left at any point in the quiz would be displayed on the top. </li>
        <li> The scoring for each attempt of a question, would be visible to you in a separate section. </li>
      </ol>

      <h2>
        Scoring
      </h2>
      <ol>
      <li> There is NEGATIVE scoring for wrong answers. So, please DO NOT GUESS. </li>
      <li> If you skip a question, the score awarded is always ZERO. </li>
      <li> Scoring would be clearly marked in the question on the right hand side box. </li>
      </ol>
    </div>
  );
};

export default InfoBox;
