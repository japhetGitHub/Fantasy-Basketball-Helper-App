import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../services/auth.service';
import Button from '@mui/material/Button';
import ErrorAlert from './utilities/ErrorAlert.jsx';
import TextField from '@mui/material/TextField';

import { StyledLogin } from '../style/Login.styles.jsx';

export default function Login(props) {
  const [loginError, setLoginError] = useState({
    hasError: false,
    msg: ''
  });
  // states for controlled components
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onClick } = props;
  const handleLogin = function(event) {
    event.preventDefault();
    AuthService.login(email, password).then(() => { // sends credentials to backend and expects to receieve access token & refresh token
      console.log("Logged in!");
      onClick("TestPage");
    }).catch((err) => {
      // unsuccessful error passed here from api.js(interceptors.response)) -> auth.service(login.post) -> here
      console.log("data:", err.response.data);
      console.log("status:", err.response.status);
      console.log("headers:", err.response.headers);
      setLoginError({ // enable error message mui component if login was unsuccessful
        hasError: true,
        msg: err.response.data
      });
    });
  };
  return (
    <StyledLogin>
      <p>
        {/* <h3>Login</h3> */}
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <TextField
            label={"email"}
            type={"email"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label={"password"}
            type={"password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
        <Button
          onClick={handleLogin}
          variant="outlined"
        >
          Login
        </Button>
        <Button
          onClick={() => onClick("HomePage")}
          variant="outlined"
        >
          Back
        </Button>
        { loginError.hasError === true && <ErrorAlert text={loginError.msg}/>}
      </p>
    </StyledLogin>
  );
}
Login.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired
};