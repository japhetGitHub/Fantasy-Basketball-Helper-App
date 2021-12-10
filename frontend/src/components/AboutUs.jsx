import React from 'react';

import lebronImage from '../image/Lebron.jpeg';
import trophyImage from '../image/trophy.jpg';

import { StyledAboutUs } from '../style/AboutUs.styles.jsx';

export default function AboutUs() {
  return (
    <StyledAboutUs>
      <h3>About us</h3>
      <p>
        Don&apos;t you wish that winning your fantasy league didn&apos;t require you to be a part-time statastician too?<br/>
        <br/>We heard from the community and created a solution that enables users to make their weekly lineup decisions as though they had their own data analytics team. We give you all the important stats in a centralized place using intuitive data visualizations.
      </p>
      <div className="aboutUsImage">
        <img
          src={lebronImage}
          alt="lebron"
          height="200px"
          weight="200px"
        />
        <img
          src={trophyImage}
          alt="trophy"
          height="200px"
          weight="200px"
        />
      </div>
    </StyledAboutUs>
  );
}