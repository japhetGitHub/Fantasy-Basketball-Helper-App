import styled from 'styled-components';

export const StyledTwitterZone = styled.div`

  color: black;
  display: flex;
  background-color: white;
  flex-direction: column;
  width: 80%;
  margin-left: 2.3em;
  margin-top: 1em;

  & .title{
    display: flex;
    margin-bottom: 0.25em;
  }

  & .timeAgo{
    display: flex;
    justify-content: center;
    margin-bottom: 0.25em;
    text-transform: capitalize; 
  }

  & .news{
    display: flex;
    text-align: justify;
    font-size: 1em;
  }

  & .source{
    display: flex;
    justify-content: center;
    font-size: 1em;
  }

`;