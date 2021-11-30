import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Carousel from './../utilities/Carousel.jsx';
import PropTypes from 'prop-types';

import { StyledListItem } from './../../style/ListItem.styles.jsx';


export default function ListItem(props) {
  const { useThat, playerName, position, sortType, stat} = props;
  
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  // ${sortType.split('lastWeek')[1]}:
  return (
    <StyledListItem>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={`${playerName} - ${position} - ${stat}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>


        <Carousel slides={useThat} />
      
      
      </Collapse>
    </StyledListItem>
  );
}

ListItem.propTypes = { // prop-types ensure that props are as component expected
  useThat: PropTypes.array,
  playerName: PropTypes.string,
  position: PropTypes.string,
  sortType: PropTypes.string,
  stat: PropTypes.string
};