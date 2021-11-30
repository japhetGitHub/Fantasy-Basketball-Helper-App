import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from './helpers/ListItem.jsx';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import teamService from '../services/team.service.js';

// take these off once connected to DB
import zionImage from './../image/zion.png';
import stephImage from './../image/steph.png';
// import PlayerCards from './PlayerCards.jsx';


import { StyledStartingLineups } from '../style/StartingLineups.styles.jsx';
import playerStats from './PlayerStats.jsx';

export default function StartingLineups(props) {
  const { onClick, selectedTeam } = props;
  const [data, setData] = useState(null);
  const [sortType, setSortType] = React.useState('Game');
  const [seasonData, setSeasonData] = useState();

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  const playerLatestGameData = {
    id: 1,
    playerid: 20,
    name: "Bradley Beal",
    team: "PHI",
    position: "SG",
    day: "2021-11-11T00:00:00",
    fantasypoints: 77.5,
    minutes: 61,
    seconds: 64,
    fieldgoalsmade: 18.9,
    fieldgoalsattempted: 29.8,
    fieldgoalspercentage: 99.3,
    effectivefieldgoalspercentage: 99.3,
    twopointersmade: 17.3,
    twopointersattempted: 25.1,
    twopointerspercentage: 108.1,
    threepointersmade: 2.5,
    threepointersattempted: 7.4,
    threepointerspercentage: 52.3,
    freethrowsmade: 12.6,
    freethrowsattempted: 12.6,
    freethrowspercentage: 157.1,
    offensiverebounds: 0,
    defensiverebounds: 9.9,
    rebounds: 9.9,
    offensivereboundspercentage: 0,
    defensivereboundspercentage: 16.5,
    totalreboundspercentage: 13.9,
    assists: 12.3,
    steals: 2.5,
    blockedshots: 4.9,
    turnovers: 4.9,
    personalfouls: 4.9,
    points: 51.8,
    trueshootingattempts: 35.4,
    trueshootingpercentage: 115.2,
    playerefficiencyrating: 55.6,
    assistspercentage: 37.3,
    stealspercentage: 3.1,
    blockspercentage: 9.5,
    turnoverspercentage: 12.8,
    usageratepercentage: 43,
    fantasypointsfanduel: 82.2,
    fantasypointsdraftkings: 80.1,
    fantasypointsyahoo: 82.2,
    plusminus: 14.1,
    doubledoubles: 0,
    tripledoubles: 0,
    fantasypointsfantasydraft: 80.1
  };

  const playerSeasonStats = {
    playerid: 20,
    name: "Bradley Beal",
    team: "WAS",
    position: "SG",
    games: 60,
    fantasypoints: 2e+07,
    minutes: 61,
    seconds: 4027,
    fieldgoalsmade: 3313,
    fieldgoalsattempted: 23,
    fieldgoalspercentage: 1033.8,
    effectivefieldgoalspercentage: 2132.4,
    twopointersmade: 74.8,
    twopointersattempted: 82.1,
    twopointerspercentage: 833.2,
    threepointersmade: 1556.9,
    threepointersattempted: 82.6,
    threepointerspercentage: 200.6,
    freethrowsmade: 575.5,
    freethrowsattempted: 53.9,
    freethrowspercentage: 629.5,
    offensiverebounds: 708.2,
    defensiverebounds: 137.2,
    rebounds: 111.1,
    offensivereboundspercentage: 325.6,
    defensivereboundspercentage: 436.7,
    totalreboundspercentage: 8.5,
    assists: 16,
    steals: 10.8,
    blockedshots: 408.9,
    turnovers: 106.5,
    personalfouls: 33.9,
    points: 288.5,
    trueshootingattempts: 216,
    trueshootingpercentage: 2897.8,
    playerefficiencyrating: 2444.1,
    assistspercentage: 91.5,
    stealspercentage: 44.3,
    blockspercentage: 32.8,
    turnoverspercentage: 3.5,
    usageratepercentage: 2,
    fantasypointsfanduel: 16.3,
    fantasypointsdraftkings: 52.9,
    fantasypointsyahoo: 4167.8,
    plusminus: 4303,
    doubledoubles: 4167.8,
    tripledoubles: -9.3,
    fantasypointsfantasydraft: 9.5,
  };

  const playerSeasonFanPoints = [
    { x: 0, y: 37.7 },
    { x: 1, y: 17.2 },
    { x: 2, y: 62.8 },
    { x: 3, y: 45 },
    { x: 4, y: 18.6 },
    { x: 5, y: 19.5 },
    { x: 6, y: 25.3 },
    { x: 8, y: 23.8 },
    { x: 9, y: 29 },
    { x: 10, y: 24.5 },
    { x: 11, y: 24.3 },
    { x: 12, y: 37.9 },
    { x: 13, y: 15.6 },
    { x: 14, y: 21.7 },
    { x: 15, y: 25.2 },
    { x: 16, y: 16.5 },
    { x: 17, y: 25.8 }
  ];
  useEffect(() => {
    teamService.getStartingLineups(selectedTeam)
      .then((response) => setData(response));
  }, []);

  useEffect(() => {
    teamService.getSpecificTeamSeasonData(selectedTeam)
      .then((response) => setSeasonData(response));
  }, []);
  
  /*
    How it's working: sort the array of player based on whats in the sortType variable, this follows the selected prompt
      in the scrolling thing(i dont know the word).

    This gives an ordered array in the way we want the list to be.

    The list entries(on the screen) comes from the ListItem component wich takes firstName, lastName and position as props to set the label of the list item
      AND it takes the useThat props that is passed straightttt to the carousel component so you need to pass it an array and everything is gonna be render
      in the carousel.

    IF IT DONT WORK, the ListItem component, in the carousel the slides is set as slides={[useThat]} SOOO drop the [], i made the testing without
      passing useThat an array and only a component so it was my easy fix to test everything.
  */

  
  
  const arrayListItem = [];
  if (data) {
    // const rankedPlayer = data.players.sort((a, b) => a[`${sortType}`] < b[`${sortType}`] ? 1 : a[`${sortType}`] > b[`${sortType}`] ? -1 : 0);

    data.players.map((singlePlayer) => {
      arrayListItem.push(<ListItem key={singlePlayer.playerId}
        useThat={ playerStats(playerLatestGameData, playerSeasonStats, playerSeasonFanPoints) }
        playerName={singlePlayer.playerName}
        position={singlePlayer.position}
      />);
    });
  }
 
  return (
    <StyledStartingLineups>
      <FormControl fullWidth>
        <InputLabel>Rank list by:</InputLabel>
        <Select
          value={sortType}
          label="Rank list by:"
          onChange={handleChange}
        >

          {/* <MenuItem value={"Game"}>Game</MenuItem> */}
          <MenuItem value={"lastWeekFantasyPointsYahoo"}>Fantasy Points</MenuItem>
          <MenuItem value={"lastWeekPoints"}>Points</MenuItem>
          <MenuItem value={"lastWeekBlocks"}>Blocks</MenuItem>
          <MenuItem value={"lastWeekSteals"}>Steals</MenuItem>

        </Select>
      </FormControl>
      <List>
        {arrayListItem}
      </List>
      <Button
        onClick={() => {
          onClick("SpecificTeamOverview");
        }}
        variant={"outlined"}
      >
        Back
      </Button>
    </StyledStartingLineups>
  );
}

StartingLineups.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
  selectedTeam: PropTypes.number.isRequired,
};