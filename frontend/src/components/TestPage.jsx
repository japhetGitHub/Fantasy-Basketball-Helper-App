import React from 'react';
import PropTypes from 'prop-types';

// import api from '../services/api';
import Button from './utilities/Button.jsx';
import ExampleService from '../services/example.service.js';

export default function TestPage(props) {
  const { onClick } = props;

  const getBookHandler = () => {
    ExampleService.getBooks();
  };

  const addBookHandler = () => {
    ExampleService.addBook("Mexico");
  };

  return (
    <div className="TestPageTestClass">
      <h1>TEST PAGE</h1>

      <Button
        onClick={() => onClick("HomeLog")}
        text={"Go Home"}
        variant="outlined"
      />
      <Button
        onClick={getBookHandler}
        text={"Get Books"}
        variant="outlined"
      />
      <Button
        onClick={addBookHandler}
        text={"Add Book - Admin Only"}
        variant="outlined"
      />
    </div>
  );
}

TestPage.propTypes = {
  onClick: PropTypes.func.isRequired
};