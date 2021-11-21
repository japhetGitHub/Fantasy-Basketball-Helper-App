import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import { Pagination } from '@mui/material';
import '../../style/pagination.css';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);



// we will need to add the props in the function
export default function Carousel(props) {
  const { slides } = props;
  
  const slideRenderer = (params) => {
    const { index, key } = params;
    const nbOfSlides = slides.length;
    const slide = mod(index, nbOfSlides);
    return (
      <div key={key} style={Object.assign({})}>
        {slides[slide]}
        <Pagination count={nbOfSlides} page={slide + 1} hidePrevButton hideNextButton size={"small"} variant={"outlined"} />
      </div>
    );
  };

  return (
    <div className="Carousel">
      <VirtualizeSwipeableViews slideRenderer={slideRenderer} />
    </div>
  );
}





