import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import ListPlayerOn from './helpers/ListPlayerOn.jsx';
import ListAddPlayer from './helpers/ListAddPlayer.jsx';
import teamService from '../services/team.service.js';

import { StyledManagePlayer } from '../style/ManagePlayer.styles.jsx';

export default function ManagePlayer(props) {
  const { onClick, selectedTeam } = props;
  const [userTeam, setUserTeam] = useState(null);

  const rankThePositions = (position) => {
    switch (position) {
    case "PG":
      return 6;
        
    case "SG":
      return 5;
      
    case "SF":
      return 4;
      
    case "PF":
      return 3;
        
    case "C":
      return 2;
          
    default:
      return 1;
    }
  };
        
  useEffect(() => {
    teamService.getPlayersToManage(selectedTeam)
      .then((response) => setUserTeam(response.sort((a, b) => rankThePositions(a.position) < rankThePositions(b.position) ? 1 : rankThePositions(a.position) > rankThePositions(b.position) ? -1 : 0)));
  }, []);


  const allPlayers = [ // all the players in the league
    {
      playerName: "Steph Curry",
      position: "PG",
      playerId: 20000
    },
    {
      playerName: "Zion Williamson",
      position: "PF",
      playerId: 20001
    },
    {
      playerName: "Another Pointguard",
      position: "PG",
      playerId: 20002
    },
    {
      playerName: "some guy",
      position: "PF",
      playerId: 2003
    },
    {
      playerName: "Yep Th",
      position: "C",
      playerId: 2004
    },
    {
      playerName: "AJ TO",
      position: "SG",
      playerId: 2005
    },
    {
      playerName: "GASD DASdas",
      position: "SF",
      playerId: 2006
    },
    {
      playerName: "dasdas dasdasdasdasdas",
      position: "SF",
      playerId: 2007
    },
  ];

  const [allPlayerInLeague, setAllPlayerInLeague] = useState(allPlayers);
  let arrayList = [];

  if (userTeam) {
    const adjustTheLeague = () => {
      for (let i = 0; i < allPlayerInLeague.length; i++) {
        for (let j = 0; j < userTeam.length; j++) {
          if (allPlayerInLeague[i].playerId === userTeam[j].playerId) {
            allPlayerInLeague.splice(i, 1);
            setAllPlayerInLeague(allPlayerInLeague);
          }
        }
      }
    };
    adjustTheLeague();

    const addPlayerInTeam = (player) => {
      player && setUserTeam(userTeam => [...userTeam, player]);
    };

    const removePlayerInTeam = (player) => {
      if (player) {
        setAllPlayerInLeague(allPlayerInLeague => [...allPlayerInLeague, player]);

        for (let i = 0; i < userTeam.length; i++) {
          if (player.playerId === userTeam[i].playerId) {
            userTeam.splice(i, 1);
            setUserTeam(userTeam);
          }
        }
      }
    };

    userTeam.forEach((singlePlayer) => {
      arrayList.push(<ListPlayerOn key={singlePlayer.playerId} player={singlePlayer} removePlayerInTeam={removePlayerInTeam} />);
    });

    for (let i = arrayList.length; i < 20; i++) {
      arrayList.push(<ListAddPlayer key={i} allPlayerInLeague={allPlayerInLeague} addPlayerInTeam={addPlayerInTeam} />);
    }
  }

  return (
    <StyledManagePlayer>
      <h3>Adjust your team roaster</h3>
      <List>
        {arrayList}
      </List>

      <Button
        onClick={() => {
          onClick("SpecificTeamOverview");
          console.log("teamstate ", userTeam); // PUT to update the state of the team in the DB
        }}
        variant={"contained"}
      >
        Keep that team state
      </Button>
      <Button
        onClick={() => onClick("SpecificTeamOverview")}
        variant={"outlined"}
      >
        Back
      </Button>

    </StyledManagePlayer>
  );
}

ManagePlayer.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
  selectedTeam: PropTypes.number.isRequired
};