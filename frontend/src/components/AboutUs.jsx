import React from 'react';
import lebronImage from '../image/Lebron.jpeg';
import trophyImage from '../image/trophy.jpg';

import { StyledAboutUs } from '../style/AboutUs.styles';

export default function AboutUs() {
  return (
    <StyledAboutUs>
      <h3>About us</h3>
      <p>
        Aren’t you tired of wasting time by switching between so many apps? Just become the king!<br/>
        <br/>Win all of your upcoming weeks in your fantasy league with our help!
      </p>
      <div className="aboutUsImage">
        <img
          src={lebronImage}
          alt="Add sign"
          height="200px"
          weight="200px"
        />
        <img
          src={trophyImage}
          alt="Add sign"
          height="200px"
          weight="200px"
        />
      </div>
    </StyledAboutUs>
  );
}