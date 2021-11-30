import React from 'react';

import { StyledEmptyPlayerCard } from '../style/EmptyPlayerCard.styles';

export default function EmptyPlayerCard() {

  return (
    <StyledEmptyPlayerCard>
      <h3>You should add some players!!</h3>
      <img
        src={"https://e3educate.org/wp-content/uploads/2021/09/user.jpg"}
        height="100px"
        width="100px"
        alt="empty player"
      />
    </StyledEmptyPlayerCard>
  );
}