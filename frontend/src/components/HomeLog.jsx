import React from 'react';
import TeamOverview from './TeamOverview.jsx';
import AddNewTeam from './AddNewTeam.jsx';
import Carousel from './utilities/Carousel.jsx';

// we will need to add the props in the function
export default function HomeLog() {
  const data = [
    {
      teamId: 1,
      teamName: "team1",
      topPerformer: {
        name: "steph",
        image: "link"
      },
      worstPerformer: {
        name: "zion",
        image: "link"
      },
      totalFanPoints: 871
    },
    {
      teamId: 2,
      teamName: "team2",
      topPerformer: {
        name: "stephen",
        image: "link"
      },
      worstPerformer: {
        name: "zion willi",
        image: "link"
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
        onClick={() => console.log(`call the info for the teamid ${singleTeam.teamId}`)}
      />);
  });

  viewArray.push(
    <AddNewTeam
      onClick={() => console.log("call the add new team")}
    />
  );
  
  return (
    <div className="HomeLog">
      <Carousel slides={viewArray} />
    </div>
  );
}