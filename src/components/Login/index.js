import { Component } from "react";

import { Navigate } from "react-router-dom";

import Cookies from "js-cookie";

import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    displayError: false,
    errorMsg: "",
  };

  onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });

    window.location.reload();
  };

  onSubmitFailure = (errorMsg) => {
    console.log(errorMsg);
    this.setState({ displayError: true, errorMsg });
  };

  usernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  passwordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmittingForm = async (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    const userDetails = { username, password };
    // if (username === 'harshith1629' && password === 'Am1629') {
    //   userDetails = {username: 'rahul', password: 'rahul@2021'}
    // }
    const apiUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  render() {
    const { username, password, displayError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");

    const validToken = jwtToken !== undefined;

    if (validToken) {
      return <Navigate to="/" replace={true} />;
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <div style={{ display: "flex" }}>
            <img
              src="https://png.pngtree.com/png-vector/20230224/ourmid/pngtree-kitchen-logo-png-image_6615814.png"
              // src="https://png.pngtree.com/png-vector/20220706/ourmid/pngtree-food-logo-png-image_5687717.png"
              alt="logo"
              width="80"
            />
            <h1 className="logo-text">HR EATS</h1>
          </div>
          <form onSubmit={this.onSubmittingForm}>
            <div className="input-container">
              <label className="label-text" htmlFor="username">
                USERNAME
              </label>
              <input
                onChange={this.usernameChange}
                className="input-bar"
                type="text"
                id="username"
                placeholder="Enter Username"
                value={username}
              />
            </div>
            <div className="input-container">
              <label className="label-text" htmlFor="password">
                PASSWORD
              </label>
              <input
                onChange={this.passwordChange}
                className="input-bar"
                type="text"
                id="password"
                placeholder="Password"
                value={password}
              />
            </div>
            <button className="submit-btn" type="submit">
              LOGIN
            </button>
            {displayError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
