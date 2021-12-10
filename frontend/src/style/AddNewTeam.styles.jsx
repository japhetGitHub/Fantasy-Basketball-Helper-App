import styled from 'styled-components';


export const StyledAddNewTeam = styled.div`
  text-align: center;

  background-color: #14346C;
  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;

  & .addTeamIcon {
    margin: 8em 0 13em;

    align-self: center;
    svg {
      width: 50%;
      height: 50%;
      color: #FBBB34;
    }
  }
`;