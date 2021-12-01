/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { VictoryArea, VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryPolarAxis, VictoryTheme } from "victory";


const getMaxima = (data) => {
  const groupedData = Object.keys(data[0]).reduce((memo, key) => {
    memo[key] = data.map((d) => d[key]);
    return memo;
  }, {});
  return Object.keys(groupedData).reduce((memo, key) => {
    memo[key] = Math.max(...groupedData[key]);
    return memo;
  }, {});
};

const processData = (data) => {
  const maxByGroup = getMaxima(data);
  const makeDataArray = (d) => {
    return Object.keys(d).map((key) => {
      return { x: key, y: d[key] / maxByGroup[key] };
    });
  };
  return data.map((datum) => makeDataArray(datum));
};

export default function LastWeekRadar(props) {
  console.log(props.pastWeekData);
  console.log(props.seasonStats);
  const characterData = [
    {
      points: Math.round(props.pastWeekData.lastWeekPoints),
      assists: Math.round(props.pastWeekData.lastWeekAssists),
      rebounds: (Math.round(props.pastWeekData.lastWeekOffensiveRebounds) + Math.round(props.pastWeekData.lastWeekDefensiveRebounds)),
      blocks: Math.round(props.pastWeekData.lastWeekBlockedShots),
      steals: Math.round(props.pastWeekData.lastWeekSteals)
    },
    {
      points: Math.round(props.seasonStats.points / props.seasonStats.games),
      assists: Math.round(props.seasonStats.assists / props.seasonStats.games),
      rebounds: Math.round(props.seasonStats.rebounds / props.seasonStats.games),
      blocks: Math.round(props.seasonStats.blockedshots / props.seasonStats.games),
      steals: Math.round(props.seasonStats.steals / props.seasonStats.games)
    }
  ];
  const [state, setState] = useState({
    data: processData(characterData),
    maxima: getMaxima(characterData)
  });
  

  return (
    <VictoryChart height="300" polar padding={{ top: 25, bottom: 25, right: 0, left: 20 }}
      // theme={VictoryTheme.material}
      domain={{ y: [ 0, 1 ] }}
    >
      <VictoryLegend x={20} y={-5}
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