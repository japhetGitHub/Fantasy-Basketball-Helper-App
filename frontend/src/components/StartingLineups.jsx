import * as React from 'react';
import List from '@mui/material/List';
import ListItem from './helpers/ListItem.jsx';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

// take these off once connected to DB
import zionImage from './../image/zion.png';
import stephImage from './../image/steph.png';
import PlayerCards from './PlayerCards.jsx';


import { StyledStartingLineups } from '../style/StartingLineups.styles.jsx';


export default function StartingLineups(props) {
  const { onClick } = props;

  const [sortType, setSortType] = React.useState('Game');
  const handleChange = (event) => {
    setSortType(event.target.value);
  };
  
  const data = {
    teamName: "teamNameHere",
    players: [
      {
        playerId: 200,
        playerFirstName: "Steph",
        playerLastName: "Curry",
        playerImage: stephImage,
        position: "PG",
        Game: 10,
        Points: 200,
        "Fantasy Points": 50,
        Blocks: 30,
        Steals: 5
      },
      {
        playerId: 201,
        playerFirstName: "Zion",
        playerLastName: "Williamson",
        playerImage: zionImage,
        position: "PF",
        Game: 15,
        Points: 100,
        "Fantasy Points": 10,
        Blocks: 10,
        Steals: 8
      },
      {
        playerId: 202,
        playerFirstName: "Another",
        playerLastName: "Point guard",
        playerImage: stephImage,
        position: "PG",
        Game: 20,
        Points: 150,
        "Fantasy Points": 30,
        Blocks: 20,
        Steals: 12
      },
    ]
  };
  
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
  const rankedPlayer = data.players.sort((a, b) => a[`${sortType}`] < b[`${sortType}`] ? 1 : a[`${sortType}`] > b[`${sortType}`] ? -1 : 0);

  rankedPlayer.map((singlePlayer) => {
    arrayListItem.push(<ListItem key={singlePlayer.playerId} useThat={
      <PlayerCards
        playerFirstName={singlePlayer.playerFirstName}
        playerLastName={singlePlayer.playerLastName}
        playerImage={singlePlayer.playerImage}
        position={singlePlayer.position}
        lastWeekPoints={singlePlayer.lastWeekPoints}
        lastWeekFan={singlePlayer.lastWeekFan}
        lastWeekBlocks={singlePlayer.lastWeekBlocks}
        lastWeekSteals={singlePlayer.lastWeekSteals}
      />}
    firstName={singlePlayer.playerFirstName}
    lastName={singlePlayer.playerLastName}
    position={singlePlayer.position}
    />);
  });
 
 
  return (
    <StyledStartingLineups>
      <FormControl fullWidth>
        <InputLabel>Rank list by:</InputLabel>
        <Select
          value={sortType}
          label="Rank list by:"
          onChange={handleChange}
        >

          <MenuItem value={"Game"}>Game</MenuItem>
          <MenuItem value={"Fantasy Points"}>Fantasy Points</MenuItem>
          <MenuItem value={"Points"}>Points</MenuItem>
          <MenuItem value={"Blocks"}>Blocks</MenuItem>
          <MenuItem value={"Steals"}>Steals</MenuItem>

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
  onClick: PropTypes.func.isRequired
};