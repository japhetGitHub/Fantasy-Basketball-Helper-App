import React from "react";
import PropTypes from 'prop-types';
import { VictoryPie, VictoryLabel, VictoryContainer } from 'victory';

export default function OvsDRebounds(props) {

  const { data } = props;

  const pieHalves = [
    { x: 1, y: data.offensiverebounds },
    { x: 2, y: data.defensiverebounds }
  ];

  return (
    <VictoryContainer height={300}>
      <VictoryPie
        standalone={false}
        width={300} height={300}
        innerRadius={60}
        labelRadius={71}
        labels={['offensive', 'defensive']}
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
    </VictoryContainer>
  );
}

OvsDRebounds.propTypes = {
  data: PropTypes.array.isRequired
};