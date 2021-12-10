import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

// This component is the radio form used when a user adds a new team that they manage to their account.
export default function RadioForm(props) {
  const { onChange } = props;
  return (
    <FormControl className="form" component="fieldset">
      <h3>What&apos;s your fantasy league?</h3>
      <RadioGroup
        row
        aria-label="fantasy"
        defaultValue="Yahoo"
        name="radio-buttons-group"
        onChange={(e) => onChange(e.target.value)}
      >
        <FormControlLabel value="Yahoo" control={<Radio />} label="Yahoo" />
        <FormControlLabel value="Draft King" control={<Radio />} label="Draft King" />
        <FormControlLabel value="Fan Duel" control={<Radio />} label="Fan Duel" />
        <FormControlLabel value="Fantasy Draft" control={<Radio />} label="Fantasy Draft" />
      </RadioGroup>
    </FormControl>
  );
}

RadioForm.propTypes = {
  onChange: PropTypes.func.isRequired
};
