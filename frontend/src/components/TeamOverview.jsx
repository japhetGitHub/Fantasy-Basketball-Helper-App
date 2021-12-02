import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import {
  StyledTeamOverview,
  StyledHeader,
  StyledCard
} from '../style/TeamOverview.styles.jsx';

export default function TeamOverview(props) {
  
  const {
    teamName,
    topPerformer,
    worstPerformer,
    totalFanPoints,
    onClick
  } = props;

  return (
    <StyledTeamOverview>
      <div className="box">
        <StyledHeader>
          <h3>{teamName}</h3>
          <Button
            onClick={onClick}
            variant={"outlined"}
          >
            More on that team
          </Button>
        </StyledHeader>

        <StyledCard>
          <h4>Top Performer</h4>
          <img
            src={topPerformer.photo_url}
            height="108px"
            width="78px"
            alt="Top Performer"
          />
          <p>{topPerformer.player_name}</p>
          <h4>Last Week Team Fantasy Points: <span><strong>{(Math.round(totalFanPoints * 100) / 100).toFixed(2)}</strong></span></h4>
          
          <h4>Worst Performer</h4>
          <img
            src={worstPerformer.photo_url}
            height="108px"
            width="78px"
            alt="Worst Performer"
          />
          <p>{worstPerformer.player_name}</p>
        </StyledCard>
      </div>
    </StyledTeamOverview>
  );
}
TeamOverview.propTypes = {
  teamName: PropTypes.string.isRequired,
  topPerformer: PropTypes.object.isRequired,
  worstPerformer: PropTypes.object.isRequired,
  totalFanPoints: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

