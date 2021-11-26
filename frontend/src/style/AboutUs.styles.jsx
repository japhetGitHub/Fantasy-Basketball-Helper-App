import styled from 'styled-components';


export const StyledAboutUs = styled.div`
  border-top: 2px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-bottom: 1em;

  & p {

    padding: 0 1.5em;
    margin-top: 0;
    color: white;
    margin-bottom: 1.5em;
  }

  & div {
    display: flex;
    justify-content: space-evenly;
  }
`;