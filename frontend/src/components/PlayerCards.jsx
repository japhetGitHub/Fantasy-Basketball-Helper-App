import React from 'react';
import PropTypes from 'prop-types';


import { StyledPlayerCards } from  '../style/PlayerCards.styles.jsx';

export default function PlayerCards(props) {
  
  const {
    playerName,
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
        <h3>{playerName},  {position}</h3>
        <img src={playerImage} height="130px" width="100px" alt="Player Face"/>
      </div>
      <div className="stats">
        <h3>Last Week Stats</h3>
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


PlayerCards.propTypes = { // prop-types ensure that props are as component expected
  playerName: PropTypes.string.isRequired,
  playerImage: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  lastWeekPoints: PropTypes.any.isRequired,
  lastWeekFan: PropTypes.any.isRequired,
  lastWeekBlocks: PropTypes.any.isRequired,
  lastWeekSteals: PropTypes.any.isRequired
};