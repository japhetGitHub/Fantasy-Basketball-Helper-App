import { Skeleton } from '@mui/material';
import React from 'react';

import { StyledEmptyPlayerCard } from '../style/EmptyPlayerCard.styles';

export default function EmptyPlayerCard() {

  return (
    <StyledEmptyPlayerCard>
      <h3>This looks empty?? You should add some players!</h3>
      <h4>Go to manage player!</h4>
      <Skeleton variant="rectangular" width={100} height={100} />

    </StyledEmptyPlayerCard>
  );
}