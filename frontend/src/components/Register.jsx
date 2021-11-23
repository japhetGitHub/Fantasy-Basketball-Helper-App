import React from 'react';
import Button from './utilities/Button.jsx';
import TextLabel from './utilities/TextLabel.jsx';

import { StyledRegister } from '../style/Register.styles';

export default function Register(props) {
  const { onClick } = props;
  return (
    <StyledRegister>
      <h3>Register</h3>
      <form>
        <TextLabel name={"Username"} />
        <TextLabel name={"Email"} />
        <TextLabel name={"Password"} />
        <TextLabel name={"Repeat Password"} />
        <Button
          onClick={() => onClick("HomeLog")}
          text={"Register"}
          variant={"contained"}
        />
        <Button
          onClick={() => onClick("HomePage")}
          text={"Back"}
          variant={"outlined"}
        />
      </form>
    </StyledRegister>
  );
}