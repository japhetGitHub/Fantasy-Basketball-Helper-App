import React from "react";
import PropTypes from 'prop-types';
import { VictoryPie, VictoryLabel, VictoryTooltip } from 'victory';

export default function OvsDRebounds(props) {
  const { data } = props;

  const pieHalves = [
    { x: 1, y: data.offensiverebounds },
    { x: 2, y: data.defensiverebounds }
  ];

  return (
    <svg viewBox="0, 0, auto, auto" height="225">
      <VictoryPie
        padding={{ top: 0, bottom: 0, right: 100, left: 60 }}
        standalone={false}
        width={400} height={220}
        origin={{ x: 175 }}
        innerRadius={60}
        labelRadius={({ innerRadius }) => innerRadius + 5 }
        labels={[`Off. ${data.offensiverebounds}`, `Def. ${data.defensiverebounds}`]}
        labelComponent={<VictoryTooltip active />}
        data={pieHalves}
        style={{ labels: { fontSize: 15, fill: "black" } }}
        colorScale={"qualitative"}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 20, fill: "white" }}
        x={175} y={110}
        text="Rebounds"
      />
    </svg>
  );
}

OvsDRebounds.propTypes = {
  data: PropTypes.array.isRequired
};