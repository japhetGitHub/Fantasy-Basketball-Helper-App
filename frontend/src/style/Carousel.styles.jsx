import styled from 'styled-components';

export const StyledCarousel = styled.div`
  color: white;
  background-color: #14346C;


  & .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }  
  
  & .content {
    width: 99%;
    align-self: center;
  }

  & .leftArrow, .rightArrow {
    align-self: center;
    width: 5%;

    & span {
      padding: 0;
    }
    padding-right: 0.5em;
  }

  & .leftArrow {
    transform: rotate(180deg);
  }

  & .carousel-view {
    overflow: hidden;
    color: white;
  }

  & nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .MuiPaginationItem-root {
    color: white;
    border-color: white;
  }

  & .Mui-selected {
    border-color: #FBBB34;
  }
`;