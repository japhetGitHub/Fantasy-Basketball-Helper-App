import React from "react";
import PropTypes from 'prop-types';
import { VictoryPie, VictoryLabel } from "victory";

export default function PieChartGraph(props) {
  const { foward, center, guard } = props;
  const total = foward + center + guard;
  const fowardPerc = Math.round(foward / total * 100);
  const centerPerc = Math.round(center / total * 100);
  const guardPerc = Math.round(guard / total * 100);

  return (
    <svg viewBox="0 0 600 600" >
      <VictoryPie
        standalone={false}
        width={600} height={600}
        data={[
          {x: "Fowards", y: fowardPerc},
          {x: "Guards", y: guardPerc},
          {x: "Centers", y: centerPerc}
        ]}
        innerRadius={90} labelRadius={135}
        style={{ labels: { fontSize: 30, fill: "white"}}}
        colorScale={["tomato", "orange", "gold" ]}
      
      />
      <circle cx="300" cy="300" r="80" fill="none" stroke="black" strokeWidth={3}/>
      <circle cx="300" cy="300" r="260" fill="none" stroke="black" strokeWidth={3}/>
      <VictoryLabel
        textAnchor="middle" verticalAnchor="middle"
        x={300} y={300}
        style={{fontSize: 30}}
        text="ftps by pos"
      />
    </svg>
  );
}

PieChartGraph.propTypes = {
  foward: PropTypes.number.isRequired,
  center: PropTypes.number.isRequired,
  guard: PropTypes.number.isRequired
};