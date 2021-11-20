import React from "react";
import Button from './Button.jsx'

export default function  HomePage (props) {  
  return(
    <div className="HomePage">
      <p className="welcome-text">Congratulations, you’re about to be a walking W.</p>
      <Button onClick={() => console.log("login clicked")} text={"Login"} />
      <Button onClick={() => console.log("register clicked")} text={"register"} />
      <div className="about-us">
        <h3>About us</h3>
        <p>Aren’t you tired of wasting time switching between so many apps to ...</p>
      </div>
    </div>
  );
}