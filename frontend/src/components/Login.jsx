import React from 'react';
import Button from './utilities/Button.jsx';
import TextLabel from './utilities/TextLabel.jsx';
import Footer from './utilities/Footer.jsx';

import { StyledLogin } from '../style/Login.styles.jsx';

export default function Login(props) {
  const {onClick} = props;
  return (
    <StyledLogin>
      <h3>Login</h3>
      <form>
        <TextLabel name={"email"} />
        <TextLabel name={"password"} />
      </form>
      <Button
        onClick={() => onClick("HomeLog")}
        text={"Login"}
        variant={"contained"}
      />
      <Button
        onClick={() => onClick("HomePage")}
        text={"Back"}
        variant={"outlined"}
      />
      <Footer />
    </StyledLogin>
  );
}