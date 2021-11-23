import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AuthService from '../services/auth.service';

import Button from './utilities/Button.jsx';
import ErrorAlert from './utilities/ErrorAlert.jsx';

export default function Login(props) {
  const [loginError, setLoginError] = useState({
    hasError: false,
    msg: ''
  });
  // states for controlled components
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const { onClick } = props;

  const handleLogin = function(event) {
    event.preventDefault();
    // console.log("In handleLogin:", AuthService);

    AuthService.login(email, password).then(() => { // sends credentials to backend and expects to receieve access token & refresh token
      console.log("Logged in!");
      // props.onClick("HomeLog");
      onClick("TestPage");

      // console.log(results);
    }).catch((err) => { // unsuccessful error passed here from api.js(interceptors.response)) -> auth.service(login.post) -> here
      console.log("Err AuthService");
      // console.log("data:", err.response.data);
      // console.log("status:", err.response.status);
      // console.log("headers:", err.response.headers);

      setLoginError({ // enable error message mui component if login was unsuccessful
        hasError: true,
        msg: err.response.data
      });
    });
  };

  return (
    <div className="Login">
      <h3>Login</h3>
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <input
          className="input-box"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="input-box"
          name="password"
          type="text"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </form>
      <Button
        onClick={handleLogin}
        text={"Login"}
      />
      <Button
        onClick={() => onClick("HomePage")}
        text={"Back"}
      />

      { loginError.hasError === true && <ErrorAlert text={loginError.msg}/>}
    </div>
  );
}

Login.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired
};