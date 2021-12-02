import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import BestWorstChart from './BestWorstChart.jsx';

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
        <h2>{teamName}</h2>
        <Button
          onClick={onClick}
          variant={"outlined"}
        >
          More Info
        </Button>
      </StyledHeader>

      <StyledCard>
        <div className="leftArrow">
          <span>&#10132;</span>
        </div>
        <div className="content">
          <div className="bestWorst">
            <div className="topPerformer">
              <h4>Top Performer</h4>
              <img
                src={topPerformer.photo_url}
                height="130px"
                width="100px"
                alt="Top Performer"
              />
              <div className="playerName">
                <div>{topPerformer.player_name}</div>
                <div>({topPerformer.player_team})</div>
              </div>
            </div>
            <div className="worstPerformer">
              <h4>Worst Performer</h4>
              <img
                src={worstPerformer.photo_url}
                height="130px"
                width="100px"
                alt="Worst Performer"
              />
              <div className="playerName">
                <div>{worstPerformer.player_name}</div>
                <div>({worstPerformer.player_team})</div>
              </div>
            </div>
          </div>
          <div className="bestWorstChart">
            <BestWorstChart
              category={"Points"}
              topPerformerStat={topPerformer.points}
              worstPerformerStat={worstPerformer.points}
            />
            <BestWorstChart
              category={"Assists"}
              topPerformerStat={topPerformer.assists}
              worstPerformerStat={worstPerformer.assists}
            />
            <BestWorstChart
              category={"Rebounds"}
              topPerformerStat={topPerformer.rebounds}
              worstPerformerStat={worstPerformer.rebounds}
            />
            <BestWorstChart
              category={"Steals"}
              topPerformerStat={topPerformer.steals}
              worstPerformerStat={worstPerformer.steals}
            />
            <BestWorstChart
              category={"Blocks"}
              topPerformerStat={topPerformer.blocks}
              worstPerformerStat={worstPerformer.blocks}
            />
          </div>
          <div className="pointsSummary">
            <h4>Last Week: <span><strong>{(Math.round(totalFanPoints * 100) / 100).toFixed(2)}</strong></span> Fan Points</h4>
          </div>
        </div>
        <div className="rightArrow">
          <span>&#10132;</span>
        </div>

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

