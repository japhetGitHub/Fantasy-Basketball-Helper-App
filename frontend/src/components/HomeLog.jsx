import React from 'react';
import PropTypes from 'prop-types';
import TeamOverview from './TeamOverview.jsx';
import AddNewTeam from './AddNewTeam.jsx';
import Carousel from './utilities/Carousel.jsx';


import { StyledHomeLog } from '../style/HomeLog.styles.jsx';

// these are link to image, take those and the images off when we get the call to the backend
import zionImage from './../image/zion.png';
import stephImage from './../image/steph.png';

// we will need to add the props in the function
export default function HomeLog(props) {
  const { onClick, onSelectedTeam } = props;
  
  const data = [
    {
      teamId: 1,
      teamName: "team1",
      topPerformer: {
        name: "steph",
        image: stephImage
      },
      worstPerformer: {
        name: "zion",
        image: zionImage
      },
      totalFanPoints: 871
    },
    {
      teamId: 2,
      teamName: "team2",
      topPerformer: {
        name: "stephen",
        image: stephImage
      },
      worstPerformer: {
        name: "zion willi",
        image: zionImage
      },
      totalFanPoints: 934
    }
  ];

  // make a request to "/api/team/all" with the JWT so we can find the user id and return all teams linked to that user



  const viewArray = data.map((singleTeam) => {
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
  });

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