import React from "react";
import PropTypes from 'prop-types';
import { VictoryArea, VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryPolarAxis } from "victory";


const getMaxima = (data) => { // returns array of the highest stats by category across all objects in playerData
  const groupedData = Object.keys(data[0]).reduce((memo, key) => {
    memo[key] = data.map((d) => d[key]);
    return memo;
  }, {});
  return Object.keys(groupedData).reduce((memo, key) => {
    memo[key] = Math.max(...groupedData[key]);
    return memo;
  }, {});
};

const processData = (data) => { // converts data points to be between 0 and 1
  const maxByGroup = getMaxima(data);
  const makeDataArray = (d) => {
    return Object.keys(d).map((key) => {
      return { x: key, y: maxByGroup[key] === 0 ? 0 : d[key] / maxByGroup[key] }; // ternary prevents divide by 0
    });
  };
  return data.map((datum) => makeDataArray(datum));
};

//This component is part of the StartingLineups view where a user can see more details about their team's players.
//This graph superimposes the player's (normalized) weekly stats on their season stats to show if they are over/under- performing compared to their average performance.
export default function LastWeekRadar(props) {
  const { pastWeekData, seasonStats } = props;
  const playerData = [
    {
      points: Math.round(pastWeekData.lastWeekPoints),
      assists: Math.round(pastWeekData.lastWeekAssists),
      rebounds: (Math.round(pastWeekData.lastWeekOffensiveRebounds) + Math.round(pastWeekData.lastWeekDefensiveRebounds)),
      blocks: Math.round(pastWeekData.lastWeekBlockedShots),
      steals: Math.round(pastWeekData.lastWeekSteals)
    },
    {
      points: Math.round(seasonStats.points / seasonStats.games), // dividing by number of games to make the data comparison proportional
      assists: Math.round(seasonStats.assists / seasonStats.games),
      rebounds: Math.round(seasonStats.rebounds / seasonStats.games),
      blocks: Math.round(seasonStats.blockedshots / seasonStats.games),
      steals: Math.round(seasonStats.steals / seasonStats.games)
    }
  ];

  const state = {
    data: processData(playerData),
    maxima: getMaxima(playerData)
  };
  
  return (
    <VictoryChart polar padding={{ top: 25, bottom: 25, right: 0, left: 20 }} domain={{ y: [ 0, 1 ] }}>
      <VictoryLegend x={20} y={0}
        title="Past Week vs Season"
        itemsPerRow={1}
        orientation="horizontal"
        gutter={20}
        style={{ border: { stroke: "none" }, title: {fontSize: 20, fill: "white", textDecoration:"underline" } }}
        data={[
          { name: "Past Week", symbol: { fill: "gold" }, labels: { fill: "white" } }, { name: "Season", symbol: { fill: "green" }, labels: { fill: "white" } }
        ]}
      />
      <VictoryGroup colorScale={["gold", "green"]}
        style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
      >
        {state.data.map((data, i) => {
          return <VictoryArea key={i} data={data}/>;
        })}
      </VictoryGroup>
      {
        Object.keys(state.maxima).map((key, i) => {
          return (
            <VictoryPolarAxis key={i} dependentAxis
              style={{
                axisLabel: { padding: 10, fill: "white", fontSize: 20 },
                axis: { stroke: "none" },
                grid: { stroke: "white", strokeWidth: 0.25, opacity: 0.5 }
              }}
              tickLabelComponent={
                <VictoryLabel labelPlacement="vertical" style={{ fill: "white", opacity: 1 }} />
              }
              labelPlacement="perpendicular"
              axisValue={i + 1} label={key}
              tickFormat={(t) => Math.ceil(t * state.maxima[key])}
              tickValues={[0.25, 0.5, 0.75]}
            />
          );
        })
      }
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ""}
        style={{
          axis: { stroke: "none" },
          grid: { stroke: "white", opacity: 0.5 }
        }}
      />
    </VictoryChart>
  );
  
}

LastWeekRadar.propTypes = { // prop-types ensure that props are as component expected
  pastWeekData: PropTypes.object.isRequired,
  seasonStats: PropTypes.object.isRequired
};