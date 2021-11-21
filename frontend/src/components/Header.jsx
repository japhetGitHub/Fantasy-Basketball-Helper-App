import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Header(props) {
  const { live } = props;
  const [liveGames, setLiveGames] = useState(null);
  useEffect(() => {
    axios.get("https://api.sportsdata.io/v3/nba/scores/json/AreAnyGamesInProgress?key=ce0935001bf94813a935f4593acd1514")
      .then((res) => setLiveGames(res.data));
  }, []);
  
  return (
    <div className="header">
      <h1>Our website name</h1>
      <div className="liveGameBanner">{live && String(liveGames)}: if it's rue, there is live game but i cant manage to show the score, else no games are on(its a if)</div>
    </div>
  );
}