import React from "react";
import PropTypes from "prop-types";

export default function LatestGame(props) {
  const { playerID } = props;

  return (
    {playerID}
  );
}

LatestGame.PropTypes = {
  playerID: PropTypes.number.isRequired
};