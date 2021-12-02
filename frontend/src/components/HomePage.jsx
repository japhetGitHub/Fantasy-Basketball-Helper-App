import React from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AboutUs from "./AboutUs.jsx";

import {
  StyledButtonHomePage,
  StyledHomePage
} from '../style/HomePage.styles.jsx';

export default function  HomePage(props) {
  const { onClick } = props;
  return (
    <StyledHomePage>
      <h3 className="header">Congratulations,<br/>you’re about to be<br/>a walking W.</h3>
      <StyledButtonHomePage>
        <Button
          onClick={() => onClick("Login")}
          variant={"contained"}
        >
          Login
        </Button>
        <Button
          onClick={() => onClick("Register")}
          variant={"outlined"}
        >
          Register
        </Button>
      </StyledButtonHomePage>
      <AboutUs />
    </StyledHomePage>
  );
}


HomePage.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
};