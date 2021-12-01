import React, { useState } from "react";
import PropTypes from "prop-types";
import AuthService from "../services/auth.service.js";
import Button from '@mui/material/Button';
import ErrorAlert from "./utilities/ErrorAlert.jsx";
import TextField from "@mui/material/TextField";
import { StyledRegister } from "../style/Register.styles.jsx";
export default function Register(props) {
  const [registerError, setRegisterError] = useState({
    hasError: false,
    msg: ""
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onClick } = props;
  const handleRegister = (event) => {
    event.preventDefault();
    AuthService.register(email, password).then(() => {
      console.log("Registered!");
      onClick("HomeLog");
    }).catch((err) => {
      setRegisterError({
        hasError: true,
        msg: err.response.data
      });
    });
  };
  return (
    <StyledRegister>
      <p>
        <h3>Register</h3>
        <form>
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
        <div className="buttons">
          <Button
            onClick={handleRegister}
            variant="outlined"
          >
            Register
          </Button>
          <Button
            onClick={() => onClick("HomePage")}
            variant="outlined"
          >
            Back
          </Button>
        </div>
        { registerError.hasError === true && <ErrorAlert text={registerError.msg}/>}
      </p>
    </StyledRegister>
  );
}
Register.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired
};
//STRETCH: form validation