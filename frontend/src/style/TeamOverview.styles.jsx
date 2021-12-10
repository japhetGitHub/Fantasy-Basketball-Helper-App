import styled from 'styled-components';

export const StyledTeamOverview = styled.div`
  height: auto;
  background-color: #14346C; 
  color: white;
  display: flex;
  flex-direction: column;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: bolder;
  
  & button {
    color: black;
    background-color: #FFAD00;
    width: auto;
    height: 3em;
  }

  & h2 {
    text-decoration: underline;
  }
`;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  & .container {
    display: flex;
    flex-direction: column;  
    height: auto;
    width: auto;  
  }

  & .bestWorstChart {
    display: flex;
    flex-direction: column;
  }
  
  & .bestWorst {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    flex-grow: 2;
    margin: 2% 2% 6%;
  }

  & .playerName {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2%;
  }

  & .topPerformer > h4, .worstPerformer > h4 {
    margin: 0;
  }

  & .topPerformer, .worstPerformer {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & .topPerformer > img, .worstPerformer > img{
    margin-top: 5%;
    border: 5px solid white;
    border-radius: 10px;
  }

  & .pointsSummary {
    align-self: center;
    font-size: 1.3em;
    margin: 0 1.25em;
  }

  & .pointsSummary > h4 {
    margin-bottom: 12%;
  }

`;