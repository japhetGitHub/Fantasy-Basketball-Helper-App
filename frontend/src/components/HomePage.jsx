import React from "react";
import Button from './utilities/Button.jsx';
import Footer from './utilities/Footer.jsx';
import AboutUs from "./AboutUs.jsx";

import {
  StyledWelcomeText,
  StyledButtonHomePage,
  StyledHomePage
} from '../style/HomePage.styles';

export default function  HomePage(props) {
  const { onClick } = props;
  return (
    <div className="HomePage">
      <StyledHomePage>
        <StyledWelcomeText>Congratulations,<br/>you’re about to be<br/>a walking W.</StyledWelcomeText>
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
      </StyledHomePage>
      <AboutUs />
      <Footer />
    </div>
  );
}