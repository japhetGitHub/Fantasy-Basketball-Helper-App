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
      <div className={"player-face"}>
        <h3>{playerFirstName} {playerLastName}, {position}</h3>
        <img src={playerImage} height="100px" width="100px" />
      </div>
      <div className="stats">
        <h3>Last week stats</h3>
        <div className={"stats-grid"}>
          <div className="points">
            <h3>Points</h3>
            <p>{lastWeekPoints}</p>
          </div>
          <div className="fanPoints">
            <h3>Fantasy Points</h3>
            <p>{lastWeekFan}</p>
          </div>
          <div className="Block">
            <h3>Blocks</h3>
            <p>{lastWeekBlocks}</p>
          </div>
          <div className="Steals">
            <h3>Steals</h3>
            <p>{lastWeekSteals}</p>
          </div>
        </div>
      </div>
    </StyledPlayerCards>
  );
}