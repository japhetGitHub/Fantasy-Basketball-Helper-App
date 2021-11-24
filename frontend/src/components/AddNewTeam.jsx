import React from 'react';
import PropTypes from 'prop-types';
import addImage from '../image/add.png';

import { StyledAddNewTeam } from '../style/AddNewTeam.styles';

export default function AddNewTeam(props) {
  const { onClick } = props;
  return (
    <StyledAddNewTeam>
      <h2>Add a new team</h2>
      <img
        src={addImage}
        alt="Add sign"
        onClick={() => onClick("CreateNewTeam")}
      />
    </StyledAddNewTeam>
  );
}


AddNewTeam.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired
};