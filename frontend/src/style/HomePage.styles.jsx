import styled from 'styled-components';

export const StyledButtonHomePage = styled.div`
  padding-bottom: 30px;
  display: flex;
  justify-content: flex-start;

  button {
    margin-right: 1em;
    margin-left: 1.5em;
  }
`;

export const StyledHomePage = styled.div`
  background-color: #14346C;

  margin-bottom: 1em;

  & .header {
    margin: 0;
    text-align: left;
    font-size: 30px;
    font-weight: normal;
    padding: 1em 1em;;
    color: white;
  }

  & .MuiButton-root {
    color: black;
    background-color: #FFAD00;;
    width: 7em;
    height: 3em;
  }

`;