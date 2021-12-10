import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RadioForm from './helpers/RadioForm.jsx';
import teamService from '../services/team.service.js';

import { StyledCreateNewTeam } from '../style/CreateNewTeam.styles.jsx';

export default function CreateNewTeam(props) {
  const [fantasyChoice, setFantasyChoice] = useState('Yahoo');
  const [teamName, setTeamName] = useState("");
  const { onClick } = props;
  return (
    <StyledCreateNewTeam>
      <h2>Create a new team</h2>
      <TextField
        label={"Name of your team"}
        type={"teamName"}
        value={teamName}
        onChange={(event) => setTeamName(event.target.value)}
        InputLabelProps={{ // MUI bug, only allows label style change through input props
          style: { color: 'white', borderColor: 'white', marginLeft: '1em' },
        }}
      />
        
      <RadioForm onChange={setFantasyChoice} />
      
      <div className="buttons">
        <Button
          onClick={() => {
            teamService.createTeam(teamName, fantasyChoice);
            onClick("HomeLog");
          }}
          variant={"contained"}
        >
          Create
        </Button>
        <Button
          onClick={() => onClick("HomeLog")}
          variant={"outlined"}
        >
          Back
        </Button>
      </div>
    </StyledCreateNewTeam>
  );
}


CreateNewTeam.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired
};