import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import ListPlayerOn from './helpers/ListPlayerOn.jsx';
import ListAddPlayer from './helpers/ListAddPlayer.jsx';
import teamService from '../services/team.service.js';
import leagueService from '../services/league.service.js';

import { StyledManagePlayer } from '../style/ManagePlayer.styles.jsx';

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

export default function ManagePlayer(props) {
  const { onClick, selectedTeam } = props;
  const [userTeam, setUserTeam] = useState(null);
  const [allPlayerInLeague, setAllPlayerInLeague] = useState(null);
  let arrayList = [];
        
  useEffect(() => {
    teamService.getPlayersToManage(selectedTeam)
      .then((response) => setUserTeam(response.sort((a, b) => rankThePositions(a.position) < rankThePositions(b.position) ? 1 : rankThePositions(a.position) > rankThePositions(b.position) ? -1 : 0)));
    
    leagueService.getAllPlayerInLeague()
      .then((response) => setAllPlayerInLeague(response));
  }, []);

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


  if (userTeam && allPlayerInLeague) {

    for (let i = 0; i < allPlayerInLeague.length; i++) {
      for (let j = 0; j < userTeam.length; j++) {
        if (allPlayerInLeague[i].playerId === userTeam[j].playerId) {
          allPlayerInLeague.splice(i, 1);
          setAllPlayerInLeague(allPlayerInLeague);
        }
      }
    }

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
          teamService.putUserTeam(selectedTeam, userTeam)
            .then(() => onClick("SpecificTeamOverview"));
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