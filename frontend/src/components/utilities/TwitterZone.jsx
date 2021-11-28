import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import leagueService from '../../services/league.service.js';

import { StyledTwitterZone } from './../../style/TwitterZone.styles.jsx';


export default function TwitterZone(props) {
  const { playerId } = props;
  const [news, setNews] = useState(null);
  useEffect(() => {
    leagueService.getNewsForPlayer("20002284") // put playerId inside of it once the real data will be there
      .then((response) => setNews(response[0]));
  }, []);

  return (
    <StyledTwitterZone>
      <div className="header">
        <h3>{news && news.Title}</h3>
        {news && news.TimeAgo}
      </div>
      <span>
        {news && news.Content}
      </span>
      <span>
        source: {news && news.Url}
      </span>
    </StyledTwitterZone>
  );
}

TwitterZone.propTypes = { // prop-types ensure that props are as component expected
  playerId: PropTypes.any
};