import React from "react";
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

// the name prop is what the text label will be called

// all props are optional

export default function TextLabel(props) {
  const { name } = props;
  
  return (
    <TextField
      label={name}
      variant="outlined"
    />
  );
}

TextLabel.propTypes = {
  name: PropTypes.string.isRequired
};