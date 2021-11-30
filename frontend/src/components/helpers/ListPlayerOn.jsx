import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import { StyledListPlayerOn } from './../../style/ListPlayerOn.styles.jsx';


export default function ListPlayerOn(props) {
  const { player, removePlayerInTeam } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <StyledListPlayerOn>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={`${player.player_name} - ${player.position}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <h4>Are you sure you want to delete this player of your team?</h4>
        
        <Button
          onClick={() => {
            handleClick();
            removePlayerInTeam(player);
          }}
          variant={"contained"}
          color={"error"}
        >
          Delete
        </Button>
      
        <Button
          onClick={handleClick}
          variant={"outlined"}
        >
          Cancel
        </Button>
      </Collapse>
    </StyledListPlayerOn>
  );
}

ListPlayerOn.propTypes = { // prop-types ensure that props are as component expected
  player: PropTypes.any,
  removePlayerInTeam: PropTypes.func
};