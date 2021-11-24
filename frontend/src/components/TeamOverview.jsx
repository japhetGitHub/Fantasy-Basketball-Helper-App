import React from 'react';
import PropTypes from 'prop-types';
import Button from './utilities/Button.jsx';

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

      <StyledHeader>
        <h3>{teamName}</h3>
        <Button
          text={"More on that team"}
          onClick={onClick}
          variant={"outlined"}
        />
      </StyledHeader>

      <StyledCard>
        <h4>Top performer</h4>
        <img
          src={topPerformer.image}
          height="100px"
          width="100px"
          alt="Top Performer"
        />
        <p>{topPerformer.name}</p>
        <h4>total team fantasy points last week:</h4>
        <span>{totalFanPoints}</span>
        <h4>Worst performer</h4>
        <img
          src={worstPerformer.image}
          height="100px"
          width="100px"
          alt="Worst Performer"
        />
        <p>{worstPerformer.name}</p>
      </StyledCard>

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

