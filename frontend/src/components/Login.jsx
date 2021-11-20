import React from 'react';
import Button from './utilities/Button.jsx'

export default function Login (props) {
  const {onClick} = props
  return (
    <div className="Login">
      <h3>Login</h3>
      <form>
      <input className="input-box" name="email" type="text" placeholder="Email" />
      <input className="input-box" name="password" type="text" placeholder="Password" />
    </form>
      <Button onClick={() => onClick("HomeLog")} text={"Login"}  />
      <Button onClick={() => onClick("HomePage")} text={"Back"}  />
    </div>
  );
}