import styled from 'styled-components';

export const StyledLiveGames = styled.div`


`;

export const StyledHeader = styled.div`
  background-color: #14346C;
  display: flex;
  flex-direction: row;
  justify-content: flex-start; 
  margin-top: 0.5em;

  & .rightHeader {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    top: 7px;
    right: 49px;
    position: relative;
  }
  & .scoreboardOutline {
    margin-bottom: 10px;
    width: 93% !important;
  }
  & .rightHeader > button {
    position: relative;
    right: -41px;
    top: -4px;
    width: auto;
    height: 38px;
  }
  & .companyLogo {
    left: 2px;
    top: -2px;
    position: relative;
  }
  & .companyLogo > img {
    width: 90%;
    height: auto;
  }


  & h3 {
    margin: 0;
    text-align: center;
    padding: 1em 0;
    font-size: 2em;
    color: white;
  }

  & .scoreboardOutline {
    display: flex;
    margin-left: 3.5em;
    width: 70%;
  }

  & .nbaLogo {
    display: flex;
  }

 

  & .team {
    display: flex;
    width: 100%;
    height: 50%;
  }

  & .icon {
    display: flex;
    width: 33%;
    justify-content: center;
    align-items: center;
  }

  & .name {
    display: flex;
    width: 33%;
    justify-content: center;
    align-items: center;
    font-size: 1.25em;
  }

  & .score {
    display: flex;
    width: 33%;
    justify-content: center;
    align-items: center;
    font-size: 1.25em;
  }

  & .team2 {
    display: flex;
    width: 100%;
    height: 50%;
  }

  & .icon2 {
    display: flex;
    width: 33%;
    justify-content: center;
    align-items: center;
  }

  & .name2 {
    display: flex;
    width: 33%;
    justify-content: center;
    align-items: center;
    font-size: 1.25em;
  }

  & .score2 {
    display: flex;
    width: 33%;
    justify-content: center;
    align-items: center;
    font-size: 1.25em;
  }

  & .scoreboard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-style: solid;
    background-color: white;
    width: 100%;
    color: black;
  }

  & p {
    text-align: center;
  }

  & .MuiButton-root {
    color: #FFAD00;
    background-color: none;
    border-color: #FBBB34;
    width: 7em;
    height: 3em;
    margin-left: 9em;
    margin-bottom: 1em;
  }
`;

