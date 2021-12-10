import React from 'react';
import PropTypes from 'prop-types';

import { StyledPlayerCards } from  '../style/PlayerCards.styles.jsx';
import { Grid } from '@mui/material';

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

        <Grid container>
          <Grid item={true} sx={{ border: 1, borderBottom: 0, borderTop: 0, borderLeft: 0, borderColor: '#FBBB34' }} xs={6}>
            <div className="points">
              <h3>Points</h3>
              <p>{lastWeekPoints}</p>
            </div>
          </Grid>
          <Grid item={true} sx={{ border: 1, borderBottom: 0, borderTop: 0, borderRight: 0, borderColor: '#FBBB34' }} xs={6}>
            <div className="fanPoints">
              <h3>Fantasy Points</h3>
              <p>{lastWeekFan}</p>
            </div>
          </Grid>
          <Grid item={true} sx={{ border: 1, borderBottom: 0, borderLeft: 0, borderColor: '#FBBB34' }} xs={6}>
            <div className="Block">
              <h3>Blocks</h3>
              <p>{lastWeekBlocks}</p>
            </div>
          </Grid>
          <Grid item={true} sx={{ border: 1, borderBottom: 0, borderRight: 0, borderColor: '#FBBB34' }} xs={6}>
            <div className="Steals">
              <h3>Steals</h3>
              <p>{lastWeekSteals}</p>
            </div>
          </Grid>
        </Grid>

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