import React from "react";
import PropTypes from 'prop-types';
import Button from './utilities/Button.jsx';
import AboutUs from "./AboutUs.jsx";

import {
  StyledButtonHomePage,
  StyledHomePage
} from '../style/HomePage.styles.jsx';

export default function  HomePage(props) {
  const { onClick } = props;
  return (
    <StyledHomePage>
      <h3>Congratulations,<br/>you’re about to be<br/>a walking W.</h3>
      <StyledButtonHomePage>
        <Button
          onClick={() => onClick("Login")}
          text={"Login"}
          variant={"contained"}
        />
        <Button
          onClick={() => onClick("Register")}
          text={"Register"}
          variant={"outlined"}
        />
      </StyledButtonHomePage>
      <AboutUs />
    </StyledHomePage>
  );
}


HomePage.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
};