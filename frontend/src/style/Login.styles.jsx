import styled from 'styled-components';

export const StyledLogin = styled.div`
  text-align: center;
  background-color: #14346C;
  height: 75%;
  padding: 1em;

  & form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 110%;
    margin: 1em;
  }

  & TextField {
    color: white;
  }

  & .MuiOutlinedInput-input{
    color: white;
  }

  & .MuiInputLabel-root{
    color: white;
  }

  & .MuiOutlinedInput-notchedOutline{
    border-color: white;
    margin: 0.5em;
  }

  & .MuiButton-root {
    color: black;
    background-color: #FFAD00;
    width: 7em;
    height: 3em;
    margin: 2em;
  }

`;

