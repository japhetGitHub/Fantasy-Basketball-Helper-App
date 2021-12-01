/* eslint-disable camelcase */
import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

import { StyledListAddPlayer } from './../../style/ListAddPlayer.styles.jsx';

export default function ListAddPlayer(props) {
  const { allPlayerInLeague,  addPlayerInTeam } = props;
  const [open, setOpen] = useState(false);
  const allPlayersLabel = [];
  
  allPlayerInLeague.forEach((player) => {
    allPlayersLabel.push({label: `${player.player_name} - ${player.position}`, player_id: player.player_id}); // set pour label
  });
  const [value, setValue] = useState(allPlayersLabel[0]);

  // value will be set to the whole object of the player but the only thing that gonna be shown is the label: value

  const handleClick = () => {
    setOpen(!open);
  };

  const addPlayer = (playerObject) => {
    allPlayerInLeague.forEach((unique) => {
      if (unique.player_id === playerObject.player_id) { // tcheck dans le tas qui vien de DB qui fit genre objet avec ccee quon a choisis
        addPlayerInTeam(unique);
        return;
      }
    });
  };
  // trouble live: faut filter les option pour drop ceux deja dans la team sinon ca fuck up pi on double le key donc react est mad
  return (
    <StyledListAddPlayer>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={`Add a new player?`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>


        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          options={allPlayersLabel}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Find your player" />}
        />
        
        <Button
          className={"Button"}
          onClick={() => {
            handleClick();
            addPlayer(value);
          }}
          variant={"contained"}
        >
          Add player
        </Button>
      
      </Collapse>
    </StyledListAddPlayer>
  );
}

ListAddPlayer.propTypes = { // prop-types ensure that props are as component expected
  addPlayerInTeam: PropTypes.func.isRequired,
  allPlayerInLeague: PropTypes.array.isRequired
};