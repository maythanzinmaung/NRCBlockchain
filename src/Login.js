import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Web3 from "web3";
import "./loginStyle.css";
import logo from "./logo.png";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

const web3 = new Web3(
  new Web3.providers.HttpProvider("http://127.0.0.1:8545/")
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordShown: false,
      input: "",
      errorMsg: "",
      acc: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePasswordVisibility.bind(this);
  }
  togglePasswordVisibility = () => {
    const { isPasswordShown } = this.state;
    this.setState({
      isPasswordShown: !isPasswordShown,
    });
    console.log(isPasswordShown);
  };

  clearError() {
    this.setState({
      errorMsg: "",
    });
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  handleSubmit(event) {

    event.preventDefault();
    if (this.state.input === "") {
      this.setState({
        errorMsg: "Password can't be Blank!",
      });
    } else {
      web3.eth.personal
        .unlockAccount(this.state.acc, this.state.input)
        .then((response) => {
          this.props.history.push("/DataEntry");
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            errorMsg: "Password Incorrect!!",
          });
        });
    }
    this.setState({ input: "" });
  }

  async loadBlockchain() {
    const accounts = await web3.eth.getAccounts();
    this.setState({ acc: accounts[0] });
  }
  componentDidMount() {
    this.loadBlockchain();
  }

  render() {
    const { isPasswordShown } = this.state;
    return (
      // <label>Don't Have an account? <a href="/DataEntry"> Sign Up!</a></label>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "greenyellow",
        }}
      >
        <div className="parentDiv">
          <div className="leftSection">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="rightSection">
            <form className="loginForm" onSubmit={this.handleSubmit}>
              <label className="title">Administrator Login</label>
              <input
                type={isPasswordShown ? "text" : "password"}
                className="inputStyle"
                onFocus={this.clearError.bind(this)}
                onChange={this.handleChange}
              />
               {this.state.input ? (
            isPasswordShown ? (
              <VisibilityIcon
                fontSize="small"
                style={{ position: "relative",top:3,right:27 }}
                onClick={this.togglePasswordVisibility}
              />
            ) : (
              <VisibilityOffIcon
                fontSize="small"
                style={{ position: "relative",top:3,right:27 }}
                onClick={this.togglePasswordVisibility}
              />
            )
          ) : (
            null
          )}
              <button type="submit" className="buttonStyle">
                Login
              </button>
              <label className="errorMsg">{this.state.errorMsg}</label>
              
            </form>
          </div>
          <div className="bottomDiv">
          <p className="forgotMsg">Forgot Password? Contact System Support!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
