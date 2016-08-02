import React, {Component, PropTypes} from 'react';

const propTypes = {
  dispatchSetToken: PropTypes.func.isRequired,
  env: PropTypes.object.isRequired,
  authFromServer: PropTypes.func.isRequired
};

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    console.log("MOUNT");
    console.log(this.props);
  }
  // componentDidMount() {
  //   this.onSubmit = this.onSubmit.bind(this);
  //   console.log("MOUNT");
  //   console.log(this.props);
  // }

  onChange(e) {
     const {dispatchSetToken} = this.props;
     console.log("Token change!");
     console.log(e.target.value);
     dispatchSetToken(e.target.value);
  }
    
  onSubmit(e) {
     const {authFromServer, env} = this.props;
     e.preventDefault();
     if (!env.token)
      return;

     console.log("Validate Token!");
     authFromServer();
  }

  render() {
    return (
      <div className="box login-box">
       <h2 style={{textAlign:"center"}}>
        Login Token
       </h2>
       <p style={{textAlign:"center"}}>
         Please enter the login token that you were given for this test. <br />
         <span style={{fontStyle: "italic"}}>
          Do not have a token yet? <a href=""> Contact us! </a>
         </span>
       </p>
       <form className="answerForm" onSubmit={this.onSubmit}>
         <input type="text"
                className=""
                id="inputToken"
                placeholder='Try "user1"'
                onChange={this.onChange}
                style={{width:"50%", marginLeft:"23%", marginRight:"25%"}}
                />
         <br />
         <input type="submit"
                className="btn btn-colored"
                id="btnSubmitToken"
                value="Submit"
                style={{width:"50%", marginLeft:"25%", marginRight:"25%"}}
                />
       </form>
       <p className="color-negative" style={{fontStyle: "italic", textAlign:"center"}}>
         {(this.props.env.failed)? "The entered token is not valid. Hint: Try 'user{1...20}'": ""}
       </p>
       <p className="color-negative" style={{fontStyle: "italic", textAlign:"center"}}>
         {(this.props.env.serverError)? "There is some issue connecting to the server.. Please try again.": ""}
       </p>
        
      </div>
    );
  }
}

LoginBox.propTypes = propTypes;

export default LoginBox;
