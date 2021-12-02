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

    & p {
      text-decoration: underline;
    }
  }

  & .player-face > img{
    margin-top: 5%;
    border: 5px solid black;
    border-radius: 10px;
  }

  & .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 
    'points fantasyPoints' 
    'blocks steals';
  }
`;

