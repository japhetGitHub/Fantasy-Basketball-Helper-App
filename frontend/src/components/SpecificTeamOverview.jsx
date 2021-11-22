import React from 'react';
import Footer from './utilities/Footer.jsx';
import Button from './utilities/Button.jsx';
import Carousel from './utilities/Carousel.jsx';
import PlayerCards from './PlayerCards.jsx';

import { StyledSpecificTeamOverview } from '../style/SpecificTeamOverview.styles';

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

  let carouselArray = rankedPlayer.map((player) => {
    return (<PlayerCards
      playerFirstName={player.playerFirstName}
      playerLastName={player.playerLastName}
      playerImage={player.playerImage}
      position={player.position}
      lastWeekPoints={player.lastWeekPoints}
      lastWeekFan={player.lastWeekFan}
      lastWeekBlocks={player.lastWeekBlocks}
      lastWeekSteals={player.lastWeekSteals}
    />);
  });

  return (
    <StyledSpecificTeamOverview>
      <p>{data.teamName}</p>
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

      <Carousel slides={carouselArray} />

      <div className={"tweets"} >
        there will be tweets here
      </div>
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
      <Footer />
    </StyledSpecificTeamOverview>
  );
}