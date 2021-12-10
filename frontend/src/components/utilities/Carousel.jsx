import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import { Pagination } from '@mui/material';

import { StyledCarousel } from '../../style/Carousel.styles.jsx';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

export default function Carousel(props) {
  const { slides } = props;

  const [slide, setSlide] = useState(0);
  
  const slideRenderer = (params) => {
    const {
      index,
      key
    } = params;

    const nbOfSlides = slides.length;
    const slide = mod(index, nbOfSlides);

    return (
      <div
        className={"container"}
        key={key}
      >
        <div className="leftArrow">
          <span>&#10132;</span>
        </div>
        
        <div className="content">
          {slides[slide]}
        </div>

        <div className="rightArrow">
          <span>&#10132;</span>
        </div>
      </div>
    );
  };

  const handleChangeIndex = (index) => {
    setSlide(mod(index, slides.length));
  };

  //The carousel being virtualized helps with performance because all the slides in the carousel aren't loaded immediately (only 1 before and after, see overscan variable)
  return (
    <StyledCarousel>
      <VirtualizeSwipeableViews enableMouseEvents={true} overscanSlideBefore={1} overscanSlideAfter={1} slideRenderer={slideRenderer} onChangeIndex={handleChangeIndex} />

      <div className={"pagination"}>
        <Pagination
          count={slides.length}
          page={slide + 1}
          hidePrevButton
          hideNextButton
          size={"small"}
          variant={"outlined"}
        />
      </div>
    </StyledCarousel>
  );
}

Carousel.propTypes = {
  slides: PropTypes.array.isRequired
};





