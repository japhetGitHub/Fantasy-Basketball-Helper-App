import styled from 'styled-components';

export const StyledLiveGames = styled.div`
border: 2px gray;
border-style: solid none;
color: white;
`;

export const StyledHeader = styled.div`
  background-color: #14346C;

  & h3 {
    margin: 0;
    text-align: center;
    padding: 1em 0;
    font-size: 2em;
    color: white;
  }

  & .liveGamePlayers {
    display: flex;
    justify-content: center;
    background-color: white;
    border-color: black;
    color: black;
    width: 50%;
    margin-left: 6em;
  }

  & .liveGameScores {
    display: flex;
    justify-content: center;
    background-color: white;
    border-color: black;
    color: black;
    width: 50%;
    margin-left: 6em;
  }

  & p {
    margin-left: 5.5em;
  }

  & .MuiButton-root {
    color: white;
    background-color: #1976d2;
    width: 7em;
    height: 3em;
    margin-left: 9em;
    margin-bottom: 1em;
  }
`;

