import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AuthService from '../services/auth.service.js';

import Button from './utilities/Button.jsx';
import ErrorAlert from './utilities/ErrorAlert.jsx';

export default function Register(props) {
  const [registerError, setRegisterError] = useState({
    hasError: false,
    msg: ''
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { onClick } = props;

  const handleRegister = (event) => {
    event.preventDefault();

    AuthService.register(email, password).then(() => {
      console.log("Registered!");

      onClick("TestPage");
    }).catch((err) => {
      setRegisterError({
        hasError: true,
        msg: err.response.data
      });
    });
  };

  return (
    <div className="Register">
      <h3>Register</h3>
      <form>
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
        onClick={handleRegister}
        text={"Register"}
      />
      <Button
        onClick={() => onClick("HomePage")}
        text={"Back"}
      />

      { registerError.hasError === true && <ErrorAlert text={registerError.msg}/>}

    </div>
  );
}

Register.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired
};

//STRETCH: form validation