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
  const [data, setData] = useState(null);

  useEffect(() => {
    teamService.getPlayersToManage(selectedTeam)
      .then((response) => setData(response));
  }, []);

  
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
  
  let arrayList = [];

  if (data) {
    const rankedPlayer = data.sort((a, b) => rankThePositions(a.position) < rankThePositions(b.position) ? 1 : rankThePositions(a.position) > rankThePositions(b.position) ? -1 : 0);
              
    arrayList = rankedPlayer.map((singlePlayer) => <ListPlayerOn key={singlePlayer.playerId} player={singlePlayer} />);

    for (let i = arrayList.length; i < 20; i++) {
      arrayList.push(<ListAddPlayer key={i} />);
    }
  }

  return (
    <StyledManagePlayer>
      <h3>Adjust your team roaster</h3>
      <List>
        {arrayList}
      </List>

      <Button
        onClick={() => onClick("SpecificTeamOverview")}
        variant={"outlined"}
      >
        Keep that team state
      </Button>

    </StyledManagePlayer>
  );
}

ManagePlayer.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
  selectedTeam: PropTypes.number.isRequired
};