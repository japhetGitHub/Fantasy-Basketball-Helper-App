import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import { Pagination } from '@mui/material';
import TeamOverview from './TeamOverview.jsx';
import AddNewTeam from './AddNewTeam.jsx';

import '../style/pagination.css';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

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

  data.push({last: true});

  const slideRenderer = (params) => {
    const { index, key } = params;
    const nbOfSlides = data.length;
    const slide = mod(index, nbOfSlides);
    return (
      <div key={key} style={Object.assign({})}>

        {data[slide].last &&
          <AddNewTeam onClick={() => console.log("call the add new team")}/>
        }

        {!data[slide].last &&
          <TeamOverview teamName={data[slide].teamName} topPerformer={data[slide].topPerformer} worstPerformer={ data[slide].worstPerformer } totalFanPoints={data[slide].totalFanPoints} onClick={() => console.log(`call the info for the teamid ${data[slide].teamId}`)} />
        }

        <Pagination count={nbOfSlides} page={slide + 1} hidePrevButton hideNextButton size={"small"} variant={"outlined"} />
      </div>
    );
  };

  // <Carousel slides={<TeamOverview ... />} lastSlide={<AddNewTeam ... />} />
  return (
    <div className="HomeLog">
      <VirtualizeSwipeableViews slideRenderer={slideRenderer} />
    </div>
  );
}