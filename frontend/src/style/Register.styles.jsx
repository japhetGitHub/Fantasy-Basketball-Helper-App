import styled from 'styled-components';

export const StyledRegister = styled.div`
  text-align: center;
  background-color: #14346C;
  display: flex;
  color: white;
  flex-direction: column;
  height: 70%;

  & form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 50%;
    margin-left: 1em;
    margin-right: 1em;
  }

  & TextField {
    color: white;
  }

  & .MuiInputLabel-root{
    color: white;
  }

  & .MuiInputBase{
    display: flex;
    color: white;
  }

  & .MuiOutlinedInput-input{
    color: white;
  }

  & .MuiOutlinedInput-notchedOutline{
    border-color: white;
    margin: 0.5em;
  }

  & .MuiButton-root {
    color: white;
    background-color: #1976d2;
    width: 7em;
    height: 3em;
    margin: 2em;
  }

  & .buttons {
    display: flex;
    justify-content: center;
  }

`;