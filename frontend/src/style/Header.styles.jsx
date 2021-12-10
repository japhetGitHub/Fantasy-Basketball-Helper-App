import styled from 'styled-components';

export const StyledLiveGames = styled.div`

`;

export const StyledHeader = styled.div`
  background-color: #14346C;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 

  & .header {
    display: flex;
    justify-content: center;

    & img {
      width: 75px;
      height: 75px;
      padding: 0.5em 0;
    }

    & .Logout-Button {
      position: absolute;
      right: 1em;
      align-self: center;
      color: #FBBB34;

      & svg {
        font-size: 1em;
      }
    }
  }

  & .scoreboard {
    border-left: 3px solid #14346C;
    border-right: 3px solid #14346C;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    padding: 0.2em 0;
    
    background-color: #FBBB34;
    color: white;

    & .team1 {
      display: flex;
      justify-content: flex-start;
  
      & .icon {
        align-self: center;
      }
      
      & .name {
        align-self: center;
        margin: 0 0.15em;

        font-size: 1.25em;
      }
      
      & .score {
        align-self: center;
        margin: 0 0.15em;
        
        font-size: 1.25em;
      }
    }
  
  
    & .team2 {
      display: flex;
      justify-content: flex-start;

      margin-left: 1em;
      
      & .icon2 {
        align-self: center;
      }
    
      & .name2 {
        align-self: center;
        margin: 0 0.15em;

        font-size: 1.25em;
      }
    
      & .score2 {
        align-self: center;
        margin: 0 0.15em;

        font-size: 1.25em;
      }
    }

  }

`;