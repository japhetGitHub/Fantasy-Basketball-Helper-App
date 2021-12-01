import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TeamOverview from './TeamOverview.jsx';
import AddNewTeam from './AddNewTeam.jsx';
import Carousel from './utilities/Carousel.jsx';

import teamService from '../services/team.service.js';

import { StyledHomeLog } from '../style/HomeLog.styles.jsx';

export default function HomeLog(props) {
  const { onClick, onSelectedTeam } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    teamService.getAllTeamForUser()
      .then((response) => setData(response));
  }, []);
  data && console.log(data);
  const viewArray = data ? data.map((singleTeam) => {
    return (
      <TeamOverview
        key={singleTeam.teamId}
        teamName={singleTeam.teamName}
        topPerformer={singleTeam.topPerformer}
        worstPerformer={singleTeam.worstPerformer}
        totalFanPoints={singleTeam.totalFanPoints}
        onClick={() => {
          onClick("SpecificTeamOverview");
          onSelectedTeam(singleTeam.teamId);
        }}
      />);
  }) : [];

  viewArray.push(
    <AddNewTeam
      onClick={onClick}
    />
  );
  
  return (
    <StyledHomeLog>
      <Carousel slides={viewArray} />
    </StyledHomeLog>
  );
}


HomeLog.propTypes = { // prop-types ensure that props are as component expected
  onClick: PropTypes.func.isRequired,
  onSelectedTeam: PropTypes.func.isRequired
};