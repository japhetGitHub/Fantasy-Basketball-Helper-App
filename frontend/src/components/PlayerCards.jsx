import React from 'react';
import { StyledPlayerCards } from  '../style/PlayerCards.styles.jsx';




export default function PlayerCards(props) {
  
  const {
    playerFirstName,
    playerLastName,
    playerImage,
    position,
    lastWeekPoints,
    lastWeekFan,
    lastWeekBlocks,
    lastWeekSteals
  } = props;
  return (
    <StyledPlayerCards>
      <h3>{playerFirstName} {playerLastName}, {position}</h3>
      <img src={playerImage} height="100px" width="100px" />
      <p>Last week stats</p>
      <div className="stats">
        <div className="top-row">
          <div className="points">
            <p>Points</p>
            <p>{lastWeekPoints}</p>
          </div>
          <div className="fanPoints">
            <p>Fantasy Points</p>
            <p>{lastWeekFan}</p>
          </div>
        </div>
        <div className="bottom-row">
          <div className="Block">
            <p>Blocks</p>
            <p>{lastWeekBlocks}</p>
          </div>
          <div className="Steals">
            <p>Steals</p>
            <p>{lastWeekSteals}</p>
          </div>
        </div>
      </div>
    </StyledPlayerCards>
  );
}