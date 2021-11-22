import React from 'react';
import TeamOverview from './TeamOverview.jsx';
import AddNewTeam from './AddNewTeam.jsx';
import Carousel from './utilities/Carousel.jsx';
import Footer from './utilities/Footer.jsx';

import { StyledHomeLog } from '../style/HomeLog.styles';

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

  const viewArray = data.map((singleTeam) => {
    return (
      <TeamOverview
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
      <Footer />
    </StyledHomeLog>
  );
}