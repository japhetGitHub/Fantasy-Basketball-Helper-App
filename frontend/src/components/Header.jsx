import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import AuthService from "../services/auth.service";
import companyLogo from "../image/logo_transparent.png";
import scoreService from "../services/livegame.service.js";

import { StyledLiveGames, StyledHeader } from "../style/Header.styles.jsx";

export default function Header(props) {
  const { onClick } = props;
  const [liveGames, setLiveGames] = useState(null);

  useEffect(() => {
    scoreService.getLiveScore().then((response) => setLiveGames(response));
  }, []);

  if (liveGames) {
    console.log(liveGames);
    console.log(liveGames[0]);
  }

  const logoutHandler = () => {
    AuthService.logout();
    onClick("HomePage");
  };

  return (
    <StyledHeader>
      <p>
        <img src={companyLogo} alt="Add sign" height="180em" weight="180em" />
      </p>

      <Button variant="outlined" onClick={logoutHandler}>
        Logout
      </Button>

      {liveGames && (
        <StyledLiveGames className="liveGamePlayers">
          {liveGames[0]} VS. {liveGames[1]}
        </StyledLiveGames>
      )}
      {liveGames && (
        <StyledLiveGames className="liveGameScores">
          {liveGames[2]} -- {liveGames[3]}
        </StyledLiveGames>
      )}
    </StyledHeader>
  );
}

Header.propTypes = {
  // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
  live: PropTypes.bool.isRequired,
};
