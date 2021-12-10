import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import leagueService from '../services/league.service.js';

import { StyledNews } from '../style/News.styles.jsx';

export default function News(props) {
  const { playerId } = props;
  const [news, setNews] = useState(null);
  
  useEffect(() => {
    leagueService.getNewsForPlayer(playerId)
      .then((response) => setNews(response[0]));
  }, []);

  return (
    <StyledNews>
      <h3 className="title">{news && news.Title}</h3>
      <span className="news">
        <p>
          {news && news.Content}
        </p>
      </span>
      <span className={"source"} >
        source: { news && <a id="newsSource" href={news.Url}>{news.Source}</a>}
      </span>
    </StyledNews>
  );
}

News.propTypes = { // prop-types ensure that props are as component expected
  playerId: PropTypes.any
};