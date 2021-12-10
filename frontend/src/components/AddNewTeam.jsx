import React from 'react';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { StyledAddNewTeam } from '../style/AddNewTeam.styles';

export default function AddNewTeam(props) {
  const { onClick } = props;
  return (
    <StyledAddNewTeam>
      <h2>Add a New Team</h2>
      
      <div className="addTeamIcon">
        <AddCircleOutlineIcon onClick={() => onClick("CreateNewTeam")} />
      </div>
    </StyledAddNewTeam>
  );
}

AddNewTeam.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired
};