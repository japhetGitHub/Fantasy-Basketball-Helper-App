import * as React from 'react';
import List from '@mui/material/List';
import Button from './utilities/Button.jsx';
import PropTypes from 'prop-types';
import ListPlayerOn from './helpers/ListPlayerOn.jsx';
import ListAddPlayer from './helpers/ListAddPlayer.jsx';

import { StyledManagePlayer } from '../style/ManagePlayer.styles.jsx';

export default function ManagePlayer(props) {
  const { onClick } = props;

  const data = [
    {
      playerName: "Steph Curry",
      position: "PG",
      playerId: 2000
    },
    {
      playerName: "Zion Williamson",
      position: "PF",
      playerId: 2001
    },
    {
      playerName: "Another Point guard",
      position: "PG",
      playerId: 2002
    },
  ];

  const arrayList = [];

  data.map((singlePlayer) => {
    arrayList.push(<ListPlayerOn key={1} player={singlePlayer} />);
  });

  for (let i = arrayList.length; i < 20; i++) {
    arrayList.push(<ListAddPlayer key={i} />);
  }

  return (
    <StyledManagePlayer>
      <h3>Adjust your team roaster</h3>
      <List>
        {arrayList}
      </List>

      <Button
        onClick={() => onClick("SpecificTeamOverview")}
        text={"Keep that team state"}
        variant={"outlined"}
      />

    </StyledManagePlayer>
  );
}

ManagePlayer.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired
};