import React from "react";
import Button from './Button.jsx'

export default function  HomePage (props) {  
  const {onClick} = props
  return(
    <div className="HomePage">
      <p className="welcome-text">Congratulations, you’re about to be a walking W.</p>
      <Button onClick={() => onClick("Login")} text={"Login"} />
      <Button onClick={() => onClick("Register")} text={"register"} />
      <div className="about-us">
        <h3>About us</h3>
        <p>Aren’t you tired of wasting time switching between so many apps to ...</p>
      </div>
    </div>
  );
}