import React from "react";
import ButtonMui from '@mui/material/Button';

// variant props can be "text" to get a button without border
// variant props can be "contained" to have the button filled in color, text colors goes to white
// variant props can be "outline" to have the text blue, filling white and border blue

// color props can be any color i think

// all props are optional

export default function Button(props) {
  const {
    onClick,
    text,
    variant,
    color
  } = props;
  
  return (
    <ButtonMui
      onClick={onClick}
      variant={variant}
      color={color}
    >
      {text}
    </ButtonMui>
  );
}