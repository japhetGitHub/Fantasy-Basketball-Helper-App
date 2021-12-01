import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AuthService from "../services/auth.service";
import nbaLogo from '../image/nba-logo-transparent.png';
import companyLogo from '../image/logo_transparent.png';
import scoreService from '../services/livegame.service.js';

// NBA Logos
import ATL from '../image/nbaLogos/ATL.png';
import BKN from '../image/nbaLogos/BKN.png';
import BOS from '../image/nbaLogos/BOS.png';
import CHA from '../image/nbaLogos/CHA.png';
import CHI from '../image/nbaLogos/CHI.png';
import CLE from '../image/nbaLogos/CLE.png';
import DAL from '../image/nbaLogos/DAL.png';
import DEN from '../image/nbaLogos/DEN.png';
import DET from '../image/nbaLogos/DET.png';
import GSW from '../image/nbaLogos/GSW.png';
import HOU from '../image/nbaLogos/HOU.png';
import IND from '../image/nbaLogos/IND.png';
import LAC from '../image/nbaLogos/LAC.png';
import LAL from '../image/nbaLogos/LAL.png';
import MEM from '../image/nbaLogos/MEM.png';
import MIA from '../image/nbaLogos/MIA.png';
import MIL from '../image/nbaLogos/MIL.png';
import MIN from '../image/nbaLogos/MIN.png';
import NOH from '../image/nbaLogos/NOH.png';
import NY from '../image/nbaLogos/NYK.png';
import OKC from '../image/nbaLogos/OKC.png';
import ORL from '../image/nbaLogos/ORL.png';
import PHI from '../image/nbaLogos/PHI.png';
import PHX from '../image/nbaLogos/PHX.png';
import POR from '../image/nbaLogos/POR.png';
import SAC from '../image/nbaLogos/SAC.png';
import SAS from '../image/nbaLogos/SAS.png';
import TOR from '../image/nbaLogos/TOR.png';
import UTH from '../image/nbaLogos/UTH.png';
import WAS from '../image/nbaLogos/WAS.png';


const logos = {
  ATL,
  BKN,
  BOS,
  CHA,
  CHI,
  CLE,
  DAL,
  DEN,
  DET,
  GSW,
  HOU,
  IND,
  LAC,
  LAL,
  MEM,
  MIA,
  MIL,
  MIN,
  NOH,
  NY,
  OKC,
  ORL,
  PHI,
  PHX,
  POR,
  SAC,
  SAS,
  TOR,
  UTH,
  WAS };

import {
  StyledLiveGames,
  StyledHeader
} from '../style/Header.styles.jsx';


export default function Header(props) {
  const { onClick } = props;
  const [liveGames, setLiveGames] = useState(null);

  useEffect(() => {
    scoreService.getLiveScore()
      .then((response) => setLiveGames(response));
  }, []);

  const logoutHandler = () => {
    AuthService.logout();
    props.setLogin(false);
    onClick("HomePage");
  };


  return (
    <StyledHeader>
      <p>
        <img
          src={companyLogo}
          alt="Add sign"
          height="180em"
          weight="180em"
        />
      </p>
      { props.login &&
        <Button
          variant="outlined"
          onClick={logoutHandler}
        >
          Logout
        </Button>
      }
      <div className="scoreboardOutline">
        <div className="nbaLogo">
          <img
            src={nbaLogo}
            alt="nba logo"
            height="100em"
            weight="30em"
          />
        </div>
        <div className="scoreboard">
          <div className="team">
            <div className="icon">
              {liveGames &&
                <img src= {logos[liveGames[0]]}
                  alt="NBA"
                  height="40em"
                  weight="40em"
                />
              }
            </div>
            <div className="name">
              {liveGames &&
                <StyledLiveGames className="liveGamePlayers">
                  {liveGames[0]}
                </StyledLiveGames>
              }
            </div>
            <div className="score">
              {liveGames &&
              <StyledLiveGames className="liveGameScores">
                {liveGames[2]}
              </StyledLiveGames>
              }
            </div>
          </div>
          <div className="team2">
            <div className="icon2">
              {liveGames &&
                <img src= {logos[liveGames[1]]}
                  alt="NBA"
                  height="40em"
                  weight="40em"
                />
              }
            </div>
            <div className="name2">
              {liveGames &&
                <StyledLiveGames className="liveGamePlayers">
                  {liveGames[1]}
                </StyledLiveGames>
              }
            </div>
            <div className="score2">
              {liveGames &&
                <StyledLiveGames className="liveGameScores">
                  {liveGames[3]}
                </StyledLiveGames>
              }
            </div>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
}


Header.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
  setLogin: PropTypes.func.isRequired,
  login: PropTypes.bool.isRequired
};