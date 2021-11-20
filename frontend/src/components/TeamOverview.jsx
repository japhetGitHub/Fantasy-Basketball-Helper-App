import React from 'react';
import Button from './utilities/Button.jsx';

export default function TeamOverview(props) {
  const { teamName, topPerformer, worstPerformer, totalFanPoints, onClick } = props;
  return (
    <div className="TeamOverview">
      <h3>{teamName}</h3>
      <Button text={"More..."} onClick={onClick} />
      <h4>Top performer</h4>
      <p>image of the top performer {topPerformer.image}</p>
      <p>{topPerformer.name}</p>
      <h4>total team fan points</h4>
      <p>{totalFanPoints}</p>
      <h4>Worst performer</h4>
      <p>image of the worst performer {worstPerformer.image}</p>
      <p>{worstPerformer.name}</p>
    </div>
  );
}