import React from 'react';
import addImage from '../image/add.png';

import { StyledAddNewTeam } from '../style/AddNewTeam.styles';

export default function AddNewTeam(props) {
  const { onClick } = props;
  return (
    <StyledAddNewTeam>
      <h2>Add a new team</h2>
      <img
        onClick={() => onClick("CreateNewTeam")}
        src={addImage}
        alt="Add sign"
      />
    </StyledAddNewTeam>
  );
}