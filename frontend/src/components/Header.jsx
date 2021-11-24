import React, { useState, useEffect } from "react";
import axios from 'axios';
import liveImage from '../image/test.png';

import Button from "./utilities/Button.jsx";
import AuthService from "../services/auth.service";

import {
  StyledLiveGames,
  StyledHeader
} from '../style/Header.styles.jsx';


export default function Header(props) {
  const { live } = props;
  const [liveGames, setLiveGames] = useState(null);

  useEffect(() => {
    axios.get("https://api.sportsdata.io/v3/nba/scores/json/AreAnyGamesInProgress?key=ce0935001bf94813a935f4593acd1514")
      .then((res) => setLiveGames(res.data));
  }, []);
  
  const logoutHandler = () => {
    AuthService.logout();
    props.onClick("HomePage");
  };

  return (
    <StyledHeader>
      <h3>Our website name</h3>
      <Button text={"Logout"} variant="outlined" onClick={logoutHandler} />
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