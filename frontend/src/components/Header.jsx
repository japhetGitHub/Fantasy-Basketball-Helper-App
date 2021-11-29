import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import liveImage from '../image/test.png';
import Button from '@mui/material/Button';
import AuthService from "../services/auth.service";
import companyLogo from '../image/logo_transparent.png';
import scoreService from '../services/livegame.service.js';
import Login from "./Login";

import {
  StyledLiveGames,
  StyledHeader
} from '../style/Header.styles.jsx';


export default function Header(props) {
  const { onClick } = props;
  const [liveGames, setLiveGames] = useState(null);
  
  // useEffect(() => {
  //   axios.get("https://api.sportsdata.io/v3/nba/scores/json/AreAnyGamesInProgress?key=ce0935001bf94813a935f4593acd1514")
  //     .then((res) => setLiveGames(res.data));
  // }, []);

  useEffect(() => {
    scoreService.getLiveScore()
      .then((response) => setLiveGames(response));
  }, []);

  const logoutHandler = () => {
    AuthService.logout();
    onClick("HomePage");
  };

  return (
    <StyledHeader>
      {/* <h3>Our website name</h3> */}
      <p>
        <img
          src={companyLogo}
          alt="Add sign"
          height="180em"
          weight="180em"
        />
      </p>
      <Button
        variant="outlined"
        onClick={logoutHandler}
      >
        Logout
      </Button>
      {liveGames &&
        <StyledLiveGames className="liveGamePlayers">
          {liveGames[0]} VS. {liveGames[1]}
        </StyledLiveGames>
      }
      {liveGames &&
        <StyledLiveGames className="liveGameScores">
          {liveGames[2]} -- {liveGames[3]}
        </StyledLiveGames>
      }
    </StyledHeader>
  );
}


Header.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
  live: PropTypes.bool.isRequired
};