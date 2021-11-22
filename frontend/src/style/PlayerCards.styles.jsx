import styled from 'styled-components';

export const StyledPlayerCards = styled.div`
  text-align:center;

  & .stats {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & .top-row {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;

      & div {
        border: 1px solid gray;
      }
    }
    
    & .bottom-row {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      
      & div {
        border: 1px solid gray;
      }
    }
  }
`;

