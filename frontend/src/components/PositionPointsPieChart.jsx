import React from "react";
import PropTypes from 'prop-types';
import { VictoryPie } from "victory";

export default function PositionPointsPieChart(props) {
  const { forward, center, guard } = props;

  const total = forward + center + guard;

  const forwardPerc = Math.round(forward / total * 100);
  const centerPerc = Math.round(center / total * 100);
  const guardPerc = Math.round(guard / total * 100);

  const dataArr = [];
  if (forwardPerc > 0) {
    dataArr.push({x: "Forwards", y: forwardPerc});
  }
  if (guardPerc > 0) {
    dataArr.push({x: "Guards", y: guardPerc});
  }
  if (centerPerc > 0) {
    dataArr.push({x: "Centers", y: centerPerc});
  }
  
  return (
    <>
      <h2>Fpts by Position</h2>
      <svg viewBox="0 0 600 815" >
        <VictoryPie
          standalone={false}
          width={600} height={600}
          data={dataArr}
          innerRadius={0} labelRadius={110}
          style={{ labels: { fontSize: 35, fill: "white"}}}
          colorScale={["tomato", "orange", "gold" ]}
        
        />
        <circle cx="300" cy="300" r="260" fill="none" stroke="white" strokeWidth={3}/>
      </svg>
    </>
  );
}

PositionPointsPieChart.propTypes = {
  forward: PropTypes.number.isRequired,
  center: PropTypes.number.isRequired,
  guard: PropTypes.number.isRequired
};