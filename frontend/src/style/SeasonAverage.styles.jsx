import styled from 'styled-components';

export const StyledSeasonAverage = styled.div`
  text-align: center;
  margin-bottom: 2%;

  & h3, h4, p {
    margin: 0;
  }
  
  & p {
    font-weight: bold;
    font-size: 1.5em;
    margin-bottom: 5%;
  }
  
  & .MuiGrid-grid-xs-12 {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  & .MuiGrid-grid-xs-4 {
    padding: 0.25em 0.5em !important;
  }
`;