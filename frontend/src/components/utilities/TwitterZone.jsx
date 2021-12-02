import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import leagueService from '../../services/league.service.js';

import { StyledTwitterZone } from './../../style/TwitterZone.styles.jsx';


export default function TwitterZone(props) {
  const { playerId } = props;
  const [news, setNews] = useState(null);
  
  useEffect(() => {
    leagueService.getNewsForPlayer(playerId) // put playerId inside of it once the real data will be there
      .then((response) => setNews(response[0]));
  }, []);

  return (
    <StyledTwitterZone>
      <h3 className="title">{news && news.Title}</h3>
      <span className="news">
        <p>
          {news && news.Content}
        </p>
      </span>
      <span className={"source"} >
        source: { news && <a id="newsSource" href={news.Url}>{news.Source}</a>}
      </span>
    </StyledTwitterZone>
  );
}

TwitterZone.propTypes = { // prop-types ensure that props are as component expected
  playerId: PropTypes.any
};