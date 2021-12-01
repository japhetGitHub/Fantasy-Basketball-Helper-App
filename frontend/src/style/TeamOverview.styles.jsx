import styled from 'styled-components';

export const StyledTeamOverview = styled.div`
  height: 37em;
  background-color: #14346C; 
  color: white;
  border: solid;
  border-width: 5px;

`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
  align-items: center;
  
  & button {
    padding: 0.3em 0.4em;
    color: black;
    background-color: #FFAD00;
    width: 13em;
    height: 3em;
  }
`;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;

 

`;