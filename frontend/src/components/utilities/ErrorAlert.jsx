import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function ErrorAlert(props) {
  const { text, strongText } = props;
  
  //This is a general error alert component, currently being used in the Login page.
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {text} <strong>{strongText}</strong>
    </Alert>
  );
}

ErrorAlert.propTypes = {
  text: PropTypes.string.isRequired,
  strongText: PropTypes.string
};