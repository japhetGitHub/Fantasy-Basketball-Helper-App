import styled from 'styled-components';

export const StyledSpecificTeamOverview = styled.div`

  text-align: center;
  margin: 1.2em 0;
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
    margin: 1em 0;
    display: flex;
    justify-content: space-around;
  }

  & .bottom-left-button{
    margin: 1em 0;
    // display: flex;
    // justify-content: space-around;
  }

  & .bottom-right-button{
    margin: 1em 0;
    // display: flex;
    // justify-content: space-around;
  }
  // background-color: green;

  & .MuiButton-root{
    color: black;
    background-color: #FFAD00;
  }

`;