import React from "react";
import PropTypes from 'prop-types';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryLabel, VictoryAxis } from 'victory';

// OPTIONS FOR LINE OF FIT
// const cartesianInterpolations = [
//   "basis",
//   "bundle",
//   "cardinal",
//   "catmullRom",
//   "linear",
//   "monotoneX",
//   "monotoneY",
//   "natural",
//   "step",
//   "stepAfter",
//   "stepBefore"
// ];

export default function FantasyPointsTrend(props) {

  const { data } = props;
  console.log(data);

  return (
    <VictoryChart height={300} >
      <VictoryAxis label="Game #" style={{
        axis: {stroke: "white"},
        axisLabel: {fill: "white"},
        ticks: {stroke: "white"},
        tickLabels: {fontSize: 15, padding: 5, fill: "white"}
      }} />
      <VictoryAxis label="FP" dependentAxis style={{
        axis: {stroke: "white"},
        axisLabel: {fill: "white"},
        ticks: {stroke: "white"},
        tickLabels: {fontSize: 15, padding: 5, fill: "white"}
      }} />
      <VictoryLabel x={125} y={15} text={"Fantasy Points (Season)"} style={{ fontSize: 25, fill: "white" }}/>
      <VictoryLine
        interpolation={"linear"} data={data}
        style={{ data: { stroke: "#c43a31" } }}
      />
      <VictoryScatter data={data}
        size={5}
        style={{ data: { fill: "#c43a31" } }}
      />
    </VictoryChart>
  );
}

FantasyPointsTrend.propTypes = {
  data: PropTypes.array.isRequired
};