import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { StyledListAddPlayer } from './../../style/ListAddPlayer.styles.jsx';

const data = [
  {
    label: "Steph Curry - PG",
    playerId: 2000
  },
  {
    label: "Zion Williamson - PF",
    playerId: 2001
  },
  {
    label: "Another Pointguard - PG",
    playerId: 2002
  },
];

export default function ListAddPlayer() {
  
  // value will be set to the whole object of the player but the only thing that gonna be shown is the label: value
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(data[0]);

  const handleClick = () => {
    setOpen(!open);
  };
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
          options={data}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Find your player" />}
        />
        
        <Button
          onClick={() => {
            handleClick();
            console.log(`save that new player(his object is gonna be in the value variable)${value.playerId}
            and refresh the whole page or only this single component if it's possible`);
          }}
          variant={"contained"}
        >
          Add player
        </Button>
      
      </Collapse>
    </StyledListAddPlayer>
  );
}