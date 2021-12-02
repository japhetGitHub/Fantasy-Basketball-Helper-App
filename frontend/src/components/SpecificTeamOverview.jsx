import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Carousel from './utilities/Carousel.jsx';
import PlayerCards from './PlayerCards.jsx';
import PieChartGraph from './utilities/PieChartGraph.jsx';
import TwitterZone from './utilities/TwitterZone.jsx';
import teamService from '../services/team.service.js';
import EmptyPlayerCard from './EmptyPlayerCard.jsx';

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
  let rankedPlayer = [];
  if (data && data.players[0]) {

    rankedPlayer = data.players.sort((a, b) => b.lastWeekFantasyPointsYahoo - a.lastWeekFantasyPointsYahoo);
    carouselArray.push(<PlayerCards
      playerName={rankedPlayer[0].playerName}
      playerImage={rankedPlayer[0].playerImage}
      position={rankedPlayer[0].position}
      lastWeekPoints={rankedPlayer[0].lastWeekPoints}
      lastWeekFan={rankedPlayer[0].lastWeekFantasyPointsYahoo}
      lastWeekBlocks={rankedPlayer[0].lastWeekBlockedShots}
      lastWeekSteals={rankedPlayer[0].lastWeekSteals}
    />);
    carouselArray.push(<PlayerCards
      playerName={rankedPlayer[rankedPlayer.length - 1].playerName}
      playerImage={rankedPlayer[rankedPlayer.length - 1].playerImage}
      position={rankedPlayer[rankedPlayer.length - 1].position}
      lastWeekPoints={rankedPlayer[rankedPlayer.length - 1].lastWeekPoints}
      lastWeekFan={rankedPlayer[rankedPlayer.length - 1].lastWeekFantasyPointsYahoo}
      lastWeekBlocks={rankedPlayer[rankedPlayer.length - 1].lastWeekBlockedShots}
      lastWeekSteals={rankedPlayer[rankedPlayer.length - 1].lastWeekSteals}
    />);
    let foward = 0;
    let center = 0;
    let guard = 0;
    data.players.forEach((player) => {
      totalTeamFanPoints += Number(player.lastWeekFantasyPointsYahoo);
      if (player.position === "SF" || player.position === "PF") {
        foward += Number(player.lastWeekFantasyPointsYahoo);
      } else if (player.position === "PG" || player.position === "SG") {
        guard += Number(player.lastWeekFantasyPointsYahoo);
      } else {
        center += Number(player.lastWeekFantasyPointsYahoo);
      }
    });
    carouselArray.push(<PieChartGraph foward={foward} center={center} guard={guard} />);

  }

  return (
    <StyledSpecificTeamOverview>
      <span className="header">{data && data.teamName} - {data && (Math.round(totalTeamFanPoints * 100) / 100).toFixed(2)} fpts</span>
      <div className={"top-button"} >
        <div className={"left-button"} >
          <Button
            className={"manage-players"}
            onClick={() => onClick("ManagePlayer")}
            variant={"outlined"}
          >
            Manage players
          </Button>
        </div>
        <Button
          className={"StartingLineups"}
          onClick={() => onClick("StartingLineups")}
          variant={"outlined"}
        >
          Starting Lineups
        </Button>
      </div>
      
      <div className="slides">
        <Carousel slides={carouselArray[0] ? carouselArray : [<EmptyPlayerCard key={"empty"} />]} />
      </div>

      {carouselArray[0] && <TwitterZone playerId={rankedPlayer[0].playerId} />}

      <div className={"bottom-button"}>

        <Button
          className={"Delete"}
          onClick={() => {
            teamService.deleteTeam(selectedTeam);
            onClick("HomeLog");
          }}
          variant={"contained"}
          color={"error"}
        >
            Delete team
        </Button>

        <Button
          className={"back"}
          onClick={() => {
            onClick("HomeLog");
            onSelectedTeam(null);
          }}
          variant={"outlined"}
        >
            Back
        </Button>

      </div>
    </StyledSpecificTeamOverview>
  );
}

SpecificTeamOverview.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
  selectedTeam: PropTypes.number.isRequired,
  onSelectedTeam: PropTypes.func.isRequired
};