import styled from 'styled-components';

export const StyledPlayerCards = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  background-color: #14346C;

  & .player-face {
    padding: 0.5em 0;
  }

  & .stats {
    padding: 0.1em 0;
    & div {
      padding: 1em 0;
    }
    & p, h3{
      margin: 0;
    }
  }

  & .player-face > img{
    margin-top: 5%;
    border: 5px solid white;
    border-radius: 10px;
  }

`;

