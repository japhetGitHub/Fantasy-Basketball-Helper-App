import React, { useState } from 'react';
import Footer from './utilities/Footer.jsx';
import Button from './utilities/Button.jsx';
import TextLabel from './utilities/TextLabel.jsx';
import RadioForm from './helpers/RadioForm.jsx';

import { StyledCreateNewTeam } from '../style/CreateNewTeam.styles';

export default function CreateNewTeam(props) {
  const [fantasyChoice, setFantasyChoice] = useState(null);
  const { onClick } = props;
  return (
    <StyledCreateNewTeam>
      <h3>Create a new team</h3>
      <TextLabel name={"Name of the team"} />
      <RadioForm onChange={setFantasyChoice} />
      <Button
        onClick={() => onClick("HomeLog")}
        text={"Create!"}
        variant={"contained"}
      />
      <Footer />
    </StyledCreateNewTeam>
  );
}