import React from 'react';
import Button from './Button.jsx'

export default function Register (props) {
  const {onClick} = props
  return (
    <div className="Register">
      <h3>Register</h3>
      <form>
      <input className="input-box" name="username" type="text" placeholder="Username" />
      <input className="input-box" name="email" type="text" placeholder="Email" />
      <input className="input-box" name="password" type="text" placeholder="Password" />
      <input className="input-box" name="repeate_password" type="text" placeholder="Repeat Password" />
    </form>
      <Button onClick={() => console.log("we should register the user based on this info")} text={"Register"}  />
      <Button onClick={() => onClick("HomePage")} text={"Back"}  />
    </div>
  );
}