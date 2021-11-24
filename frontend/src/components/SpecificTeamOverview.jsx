import React from 'react';
import PropTypes from 'prop-types';
import Button from './utilities/Button.jsx';
import Carousel from './utilities/Carousel.jsx';
import PlayerCards from './PlayerCards.jsx';
import PieChartGraph from './utilities/PieChartGraph.jsx';
import TwitterZone from './utilities/TwitterZone.jsx';

import { StyledSpecificTeamOverview } from '../style/SpecificTeamOverview.styles.jsx';

// take these off once connected to DB
import zionImage from './../image/zion.png';
import stephImage from './../image/steph.png';

export default function SpecificTeamOverview(props) {
  const { onClick, selectedTeam, onSelectedTeam } = props;

  // do an axios request based on the selectedTeam for the teamId and return only fantasy points set
  // as the fantasy choice the user picked for that specific team
  // all these data are average of the last week played

  const data = {
    teamName: "teamNameHere",
    players: [
      {
        playerFirstName: "Steph",
        playerLastName: "Curry",
        playerImage: stephImage,
        position: "PG",
        lastWeekPoints: 200,
        lastWeekFan: 50,
        lastWeekBlocks: 30,
        lastWeekSteals: 10
      },
      {
        playerFirstName: "Zion",
        playerLastName: "Williamson",
        playerImage: zionImage,
        position: "PF",
        lastWeekPoints: 100,
        lastWeekFan: 10,
        lastWeekBlocks: 10,
        lastWeekSteals: 10
      },
      {
        playerFirstName: "Another",
        playerLastName: "Point guard",
        playerImage: stephImage,
        position: "PG",
        lastWeekPoints: 150,
        lastWeekFan: 30,
        lastWeekBlocks: 20,
        lastWeekSteals: 10
      },
    ]
  };

  const rankedPlayer = data.players.sort((a, b) => a.lastWeekFan < b.lastWeekFan ? 1 : a.lastWeekFan > b.lastWeekFan ? -1 : 0);

  const carouselArray = [];
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

  return (
    <StyledSpecificTeamOverview>
      <span>{data.teamName} - 857 fpts</span>
      <div className={"top-button"} >
        <Button
          onClick={() => console.log("go to manage player")}
          text={"Manage players"}
          variant={"outlined"}
        />
        <Button
          onClick={() => console.log("go to Starting Lineups")}
          text={"Starting Lineups"}
          variant={"outlined"}
        />
      </div>
      
      <Carousel slides={carouselArray} />

      <TwitterZone />

      <div className={"bottom-button"}>
        <Button
          onClick={() => {
            onClick("HomeLog");
            onSelectedTeam(null);
          }}
          text={"Back"}
          variant={"outlined"}
        />
        <Button
          onClick={() => console.log("go to delete team")}
          text={"Delete team"}
          variant={"contained"}
          color={"error"}
        />
      </div>
    </StyledSpecificTeamOverview>
  );
}

SpecificTeamOverview.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
  selectedTeam: PropTypes.number.isRequired,
  onSelectedTeam: PropTypes.func.isRequired
};