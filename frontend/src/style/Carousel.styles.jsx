import styled from 'styled-components';

export const StyledCarousel = styled.div`
  color: white;
  
  & .carousel-view {
    overflow: hidden;
    color: white;
  }

  & nav {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  & .pagination {
    margin-top: auto;
    background-color: #14346C;
    color: white;
    border-color: #ddd;
  }
  & .MuiPaginationItem-root {
    color: white;
    border-color: white;
  }
  & .Mui-selected {
    border-color: #FBBB34;
  }

`;