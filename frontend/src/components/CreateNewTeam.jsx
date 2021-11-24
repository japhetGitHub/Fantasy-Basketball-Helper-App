import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './utilities/Button.jsx';
import TextLabel from './utilities/TextLabel.jsx';
import RadioForm from './helpers/RadioForm.jsx';

import { StyledCreateNewTeam } from '../style/CreateNewTeam.styles.jsx';

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
      <Button
        onClick={() => onClick("HomeLog")}
        text={"Back"}
        variant={"outlined"}
      />
    </StyledCreateNewTeam>
  );
}


CreateNewTeam.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired
};