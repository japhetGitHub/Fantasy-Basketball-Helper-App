import styled from 'styled-components';


export const StyledAboutUs = styled.div`
  border-top: 2px solid #FBBB34;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-bottom: 1em;

  & h3 {
    margin: 0;
    text-align: left;
    font-size: 25px;
    font-weight: normal;
    padding: 1em 1em;;
    color: white;
  }


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

  & img {
    border: 2px solid white;
  }
`;