import styled from 'styled-components';

export const StyledCreateNewTeam = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 1em 0 6.5em;
  margin-bottom: 1em;
  background-color: #14346C;
  color: white;

  & h2 {
    margin-bottom: 1.5em;
  }

  & .MuiOutlinedInput-root {
    margin: 0 1em;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: white !important;
  }

  & .MuiInputBase-root {
    color: white;
  }
  & .MuiTextField-root {
    margin-top: 1em;
  }
  & .MuiFormGroup-root {
    display: flex;
    flex-direction: column;
    padding: 1em 2em;
    
    & .MuiRadio-root {
      color: white;
    }
  }

  & .form {
    padding-top: 2.5em;
    padding-bottom: 2.5em;

    & h3 {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  & button {
    margin: 0 1em;
    color: black;
    background-color: #FFAD00;
  }
  
  & button:first-child {
    background-color: #059234;
  }
`;