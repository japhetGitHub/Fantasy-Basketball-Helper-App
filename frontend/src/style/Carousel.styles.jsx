import styled from 'styled-components';

export const StyledCarousel = styled.div`
  & .carousel-view {
    overflow: hidden;
  }

  & nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .pagination {
    margin-top: auto;
  }
`;