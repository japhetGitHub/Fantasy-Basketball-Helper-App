import React, { useState, useEffect } from "react";
import axios from 'axios';
import liveImage from '../image/test.png';

import {
  StyledLiveGames,
  StyledHeader
} from '../style/Header.styles';


export default function Header(props) {
  const { live } = props;
  const [liveGames, setLiveGames] = useState(null);

  useEffect(() => {
    axios.get("https://api.sportsdata.io/v3/nba/scores/json/AreAnyGamesInProgress?key=ce0935001bf94813a935f4593acd1514")
      .then((res) => setLiveGames(res.data));
  }, []);
  
  return (
    <div className="header">
      <StyledHeader>Our website name</StyledHeader>
      {live &&
        <StyledLiveGames className="liveGameBanner">
          <img
            src={liveImage}
            alt="fake live games"
            width="375px"
          />
        </StyledLiveGames>
      }
    </div>
  );
}