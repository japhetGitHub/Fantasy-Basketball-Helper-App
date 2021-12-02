import styled from 'styled-components';

export const StyledTeamOverview = styled.div`
  height: auto;
  background-color: #14346C; 
  color: white;
  // border: 5px dotted white;
  display: flex;
  flex-direction: column;
  // border: 1px solid black;
  // border-radius: 25px;
  // background-color: #14346Cad;
  // border: 1px solid red;
  // border-radius: 10px;

`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-around;
  // flex: 1;
  align-items: center;
  font-weight: bolder;
  
  // border: 1px dotted yellow;
  // margin-top: -2%;
  & button {
    // padding: 0.3em 0.4em;
    color: black;
    background-color: #FFAD00;
    width: auto;
    height: 3em;
  }

  & h2 {
    // border: 1px dotted red;
    text-decoration: underline;
  }
`;

export const StyledCard = styled.div`
  // display: flex;
  // flex-direction: column;
  // // align-items: center;
  // height: auto;
  // width: auto;
  // // border: 1px dotted cyan;

  display: flex;
  flex-direction: row;
  justify-content: center;

  & .leftArrow, .rightArrow {
    align-self: center;
  }
  & .leftArrow {
    transform: rotate(180deg);
  }
  
  // flex-grow: 4;

  & .container {
    display: flex;
    flex-direction: column;  
    height: auto;
    width: auto;  
  }

  & .bestWorstChart {
    // border: 1px dotted orange;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    margin-bottom: -2%;
  }
  
  & .bestWorst {
    // border: 1px dotted red;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    // justify-content: space-between;
    // margin: 0;
    flex-grow: 2;
    // align-self: stretch;
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
    // border: 3px solid black;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & .topPerformer > img, .worstPerformer > img{
    margin-top: 5%;
    border: 5px solid black;
    border-radius: 10px;
  }

  & .pointsSummary {
    // border: 1px dotted green;
    margin-bottom: 0%;
    align-self: center;
    // justify-content: flex-start;
    font-size: 1.3em;
    // padding: 0 1%;
  }

  & .pointsSummary > h4 {
    margin-bottom: 12%;
  }

 

`;