import React, {PropTypes} from 'react';

// This is a stateless functional component. (Also known as pure or dumb component)
// More info: https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components
// And https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d
// Props are being destructured below to extract the savings object to shorten calls within component.
const LastScoreBox = ({lastScore}) => {
   let colorClass = "color-positive";
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
};

LastScoreBox.propTypes = {
  lastScore: PropTypes.number.isRequired
};

export default LastScoreBox;
