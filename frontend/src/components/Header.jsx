import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import liveImage from '../image/test.png';
import Button from '@mui/material/Button';
import AuthService from "../services/auth.service";

import {
  StyledLiveGames,
  StyledHeader
} from '../style/Header.styles.jsx';


export default function Header(props) {
  const { live, onClick } = props;
  const [liveGames, setLiveGames] = useState(null);
  
  useEffect(() => {
    axios.get("https://api.sportsdata.io/v3/nba/scores/json/AreAnyGamesInProgress?key=ce0935001bf94813a935f4593acd1514")
      .then((res) => setLiveGames(res.data));
  }, []);
  
  const logoutHandler = () => {
    AuthService.logout();
    onClick("HomePage");
  };

  return (
    <StyledHeader>
      <h3>Our website name</h3>
      
      <Button
        variant="outlined"
        onClick={logoutHandler}
      >
        Logout
      </Button>
      
      {live &&
        <StyledLiveGames className="liveGameBanner">
          <img
            src={liveImage}
            alt="fake live games"
            width="358px"
          />
        </StyledLiveGames>
      }
    </StyledHeader>
  );
}


Header.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
  live: PropTypes.bool.isRequired
};