import styled from 'styled-components';

export const StyledSpecificTeamOverview = styled.div`

  text-align: center;
  margin: 1em 0;
  background-color: #14346C;

  & span {
    font-weight: bold;
    font-size: 1.5em;
    padding: 1em 1em;
  }

  & .header {
    color: white;
    background-color: #14346C;
    display: flex;
    margin-top: -1em;
  }

  & .top-button{
    margin: 0 0;
    display: flex;
    justify-content: space-around;
  }

  & .manage-players {
    margin-top: 1em;
    background-color: #FFAD00;
  }

  & .StartingLineups {
    margin-top: 1em;
    background-color: #FFAD00;
  }

  & .back {
    background-color: #FFAD00;
    margin: 1em 1em;
  }

  & .Delete {
    margin-right: 1em;
  }

  & .MuiButton-root{
    color: black;
    
  }

`;