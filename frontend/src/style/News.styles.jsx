import styled from 'styled-components';

export const StyledNews = styled.div`

  color: black;
  display: flex;
  background-color: #FBBB34;
  flex-direction: column;
  width: 80%;
  margin-left: 2em;
  margin-top: 1em;
  border: solid;
  border-color: white;

  & .title{
    display: flex;
    margin-bottom: 0.25em;
  }

  & .timeAgo{
    display: flex;
    justify-content: center;
    margin-bottom: 0.25em;
    text-transform: capitalize; 
  }

  & .news{
    display: flex;
    text-align: justify;
    font-size: 0.8em;
    padding-top: 0;
    padding-bottom: 0;
  }
  
  & .news > p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
  }

  & .source{
    display: flex;
    justify-content: center;
    font-size: 1em;

    padding-top: 0.2em;
    padding-bottom: 0.2em;
  }

`;