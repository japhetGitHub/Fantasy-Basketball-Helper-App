import React from 'react';

export default function AddNewTeam (props) {
  return (
    <div className="AddNewTeam" >
      <h3>Add a new team</h3>
      <img onClick={props.onClick} src='https://preview.pixlr.com/images/800wm/100/1/1001388439.jpg' alt="Add sign" height="200px" weight="200px"></img>
    </div>
  );
}