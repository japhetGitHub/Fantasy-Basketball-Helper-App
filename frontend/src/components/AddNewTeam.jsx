import React from 'react';
import addImage from '../image/add.png';

export default function AddNewTeam(props) {
  const { onClick } = props;
  return (
    <div className="AddNewTeam" >
      <h3>Add a new team</h3>
      <img
        onClick={() => onClick("CreateNewTeam")}
        src={addImage}
        alt="Add sign"
        height="200px"
        weight="200px"
      />
    </div>
  );
}