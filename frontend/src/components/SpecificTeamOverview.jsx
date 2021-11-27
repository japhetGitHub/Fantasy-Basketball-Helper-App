import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Carousel from './utilities/Carousel.jsx';
import PlayerCards from './PlayerCards.jsx';
import PieChartGraph from './utilities/PieChartGraph.jsx';
import TwitterZone from './utilities/TwitterZone.jsx';
import teamService from '../services/team.service.js';

import { StyledSpecificTeamOverview } from '../style/SpecificTeamOverview.styles.jsx';

export default function SpecificTeamOverview(props) {
  const { onClick, selectedTeam, onSelectedTeam } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    teamService.getAllPlayerForTeam(selectedTeam)
      .then((response) => setData(response));
  }, []);

  const carouselArray = [];
  let totalTeamFanPoints = 0;
  if (data) {
    const rankedPlayer = data.players.sort((a, b) => a.lastWeekFan < b.lastWeekFan ? 1 : a.lastWeekFan > b.lastWeekFan ? -1 : 0);
    carouselArray.push(<PlayerCards
      playerFirstName={rankedPlayer[0].playerFirstName}
      playerLastName={rankedPlayer[0].playerLastName}
      playerImage={rankedPlayer[0].playerImage}
      position={rankedPlayer[0].position}
      lastWeekPoints={rankedPlayer[0].lastWeekPoints}
      lastWeekFan={rankedPlayer[0].lastWeekFan}
      lastWeekBlocks={rankedPlayer[0].lastWeekBlocks}
      lastWeekSteals={rankedPlayer[0].lastWeekSteals}
    />);
    carouselArray.push(<PlayerCards
      playerFirstName={rankedPlayer[rankedPlayer.length - 1].playerFirstName}
      playerLastName={rankedPlayer[rankedPlayer.length - 1].playerLastName}
      playerImage={rankedPlayer[rankedPlayer.length - 1].playerImage}
      position={rankedPlayer[rankedPlayer.length - 1].position}
      lastWeekPoints={rankedPlayer[rankedPlayer.length - 1].lastWeekPoints}
      lastWeekFan={rankedPlayer[rankedPlayer.length - 1].lastWeekFan}
      lastWeekBlocks={rankedPlayer[rankedPlayer.length - 1].lastWeekBlocks}
      lastWeekSteals={rankedPlayer[rankedPlayer.length - 1].lastWeekSteals}
    />);
    carouselArray.push(<PieChartGraph foward={200} center={600} guard={100} />);
    
    data.players.forEach((player) => totalTeamFanPoints += player.lastWeekFan);
  }

  return (
    <StyledSpecificTeamOverview>
      <span className="header">{data && data.teamName} - {data && totalTeamFanPoints} fpts</span>
      <div className={"top-button"} >
        <div className={"left-button"} >
          <Button
            onClick={() => onClick("ManagePlayer")}
            variant={"outlined"}
          >
            Manage players
          </Button>
        </div>
        <Button
          onClick={() => onClick("StartingLineups")}
          variant={"outlined"}
        >
          Starting Lineups
        </Button>
      </div>
      
      <Carousel slides={carouselArray} />

      <TwitterZone />

      <div className={"bottom-button"}>
        <div className={"bottom-left-button"}>
          <Button
            onClick={() => {
              onClick("HomeLog");
              onSelectedTeam(null);
            }}
            variant={"outlined"}
          >
            Back
          </Button>
        </div>
        <div className={"bottom-right-button"}>
          <Button
            onClick={() => teamService.deleteTeam()}
            variant={"contained"}
            color={"error"}
          >
            Delete team
          </Button>
        </div>
      </div>
    </StyledSpecificTeamOverview>
  );
}

SpecificTeamOverview.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
  selectedTeam: PropTypes.number.isRequired,
  onSelectedTeam: PropTypes.func.isRequired
};