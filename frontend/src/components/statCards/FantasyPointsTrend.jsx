import React from "react";
import PropTypes from 'prop-types';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryLabel } from 'victory';

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

  return (
    <VictoryChart height={390}>
      <VictoryLabel x={100} y={25} text={"Fantasy Points (Season)"} style={{ fontSize: 30 }}/>
      <VictoryLine
        interpolation={"cardinal"} data={data}
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