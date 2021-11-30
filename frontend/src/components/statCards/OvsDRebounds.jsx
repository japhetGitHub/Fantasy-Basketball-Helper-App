import React from "react";
import PropTypes from 'prop-types';
import { VictoryPie, VictoryLabel } from 'victory';

export default function OvsDRebounds(props) {

  const { data } = props;

  const pieHalves = [
    { x: 1, y: data.offensiverebounds },
    { x: 2, y: data.defensiverebounds }
  ];

  return (
    <svg viewBox="0 0 300 300" >
      <VictoryPie
        standalone={false}
        width={300} height={300}
        innerRadius={60}
        labelRadius={72}
        labels={[`offensive ${data.offensiverebounds}`, `defensive ${data.defensiverebounds}`]}
        data={pieHalves}
        style={{ labels: { fontSize: 15, fill: "white" } }}
        colorScale={"qualitative"}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 20 }}
        x={150} y={150}
        text="Rebounds"
      />
    </svg>
  );
}

OvsDRebounds.propTypes = {
  data: PropTypes.array.isRequired
};