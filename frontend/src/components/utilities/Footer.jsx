import React from "react";
import infoImage from '../../image/information-button.png';
import facebookImage from '../../image/facebook.png';
import instagramImage from '../../image/instagram.png';
import creativeCommonsImage from '../../image/creative-commons.png';

import { StyledFooter } from "../../style/Footer.styles.jsx";


export default function Footer() {
  return (
    <StyledFooter>
      <img
        src={creativeCommonsImage}
        alt="CC footer"
        height="25px"
        width="25px"
      />
      <img
        src={infoImage}
        alt="info footer"
        height="25px"
        width="25px"
      />
      <img
        src={facebookImage}
        alt="facebook footer"
        height="25px"
        width="25px"
      />
      <img
        src={instagramImage}
        alt="instagram footer"
        height="25px"
        width="25px"
      />
    </StyledFooter>
  );
}