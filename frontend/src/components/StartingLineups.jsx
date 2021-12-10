import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ListItem from './helpers/ListItem.jsx';
import teamService from '../services/team.service.js';
import playerStats from './PlayerStats.jsx';

import { StyledStartingLineups } from '../style/StartingLineups.styles.jsx';

/*
  How it's working: sorts the array of players based on whats in the sortType variable. This variable follows what's selected in the dropdown selector.

  The list entries(on the screen) comes from the ListItem component wich takes firstName, lastName and position as props to set the label of the list item
  AND it takes the useThat array as a prop which is passed straight to the carousel component.
*/
export default function StartingLineups(props) {
  const { onClick, selectedTeam } = props;

  const [sortType, setSortType] = useState('lastWeekPoints');
  const [lastWeekData, setLastWeekData] = useState(null);
  const [seasonData, setSeasonData] = useState();
  const [latestGameData, setLatestGameData] = useState();
  const [seasonFanPoints, setSeasonFanPoints] = useState();

  const handleChange = (event) => {
    setSortType(event.target.value);
  };

  useEffect(() => {
    teamService.getStartingLineups(selectedTeam)
      .then((response) => setLastWeekData(response));

    teamService.getSpecificTeamSeasonData(selectedTeam)
      .then((response) => setSeasonData(response));

    teamService.getSpecificTeamLatestGameData(selectedTeam)
      .then((response) => setLatestGameData(response));

    teamService.getPlayerFantasyPointsHistory(selectedTeam)
      .then((response) => setSeasonFanPoints(response));
  }, []);

  const arrayListItem = [];
  if (lastWeekData && latestGameData && seasonData && seasonFanPoints) {
    const rankedPlayers = lastWeekData.players.sort((a, b) => b[`${sortType}`] - a[`${sortType}`]);

    rankedPlayers.map((singlePlayer) => {
      arrayListItem.push(<ListItem key={singlePlayer.playerId}
        useThat={ playerStats(
          latestGameData.data.find(({ playername }) => playername === singlePlayer.playerName),
          seasonData.data.find(({ playername }) => playername === singlePlayer.playerName),
          seasonFanPoints.find(({ playerName }) => playerName === singlePlayer.playerName).games,
          singlePlayer
        ) }
        playerName={singlePlayer.playerName}
        position={singlePlayer.position}
        sortType={sortType}
        stat={singlePlayer[`${sortType}`]}
      />);
    });
  }
 
  return (
    <StyledStartingLineups>
      <FormControl fullWidth>
        <Select
          value={sortType}
          onChange={handleChange}
        >
          <MenuItem value={"lastWeekFantasyPointsYahoo"}>Fantasy Points</MenuItem>
          <MenuItem value={"lastWeekPoints"}>Points</MenuItem>
          <MenuItem value={"lastWeekBlockedShots"}>Blocks</MenuItem>
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
        className={"back-button"}
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