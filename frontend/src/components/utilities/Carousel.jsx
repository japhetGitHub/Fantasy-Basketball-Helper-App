import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import { Pagination } from '@mui/material';

import { StyledCarousel } from '../../style/Carousel.styles.jsx';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

// we will need to add the props in the function
export default function Carousel(props) {
  const { slides } = props;
  
  const slideRenderer = (params) => {
    const {
      index,
      key
    } = params;

    const nbOfSlides = slides.length;
    const slide = mod(index, nbOfSlides);
    return (
      <div
        className={"test"}
        key={key}
        style={Object.assign({})}
        
      >
        {slides[slide]}
        <div className={"pagination"}>
          <Pagination
            count={nbOfSlides}
            page={slide + 1}
            hidePrevButton
            hideNextButton
            size={"small"}
            variant={"outlined"}
          />
        </div>
      </div>
    );
  };

  return (
    <StyledCarousel>
      <VirtualizeSwipeableViews slideRenderer={slideRenderer} />
    </StyledCarousel>
  );
}
Carousel.propTypes = {
  slides: PropTypes.array.isRequired
};





