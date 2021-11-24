import styled from 'styled-components';


export const StyledAboutUs = styled.div`
  border-top: 2px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-bottom: 1em;

  & p {
    padding: 0 1em;
  }

  & div {
    display: flex;
    justify-content: space-evenly;
  }
`;