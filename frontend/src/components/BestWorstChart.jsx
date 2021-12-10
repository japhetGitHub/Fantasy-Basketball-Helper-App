import React, { useEffect, useState } from "react";
import PropType from 'prop-types';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryStack } from "victory";

const width = 300;
const height = 30;

export default function BestWorstChart(props) {
  const [valueA, setValueA] = useState(0); // topPerformer stats
  const [valueB, setValueB] = useState(0); // worstPerformer stats

  const { topPerformerStat, worstPerformerStat, category } = props;

  const dataA = [
    { x: category, y: valueA}
  ];

  const dataB = [
    { x: category, y: valueB}
  ];

  useEffect(() => {
    setValueA(Math.round(topPerformerStat) || 0);
    setValueB(Math.round(worstPerformerStat) || 0);
  }, [topPerformerStat, worstPerformerStat]);

  return (
    <VictoryChart horizontal
      height={height}
      width={width}
      padding={75}
    >
      <VictoryStack
        style={{ data: { width: 25 }, labels: { fontSize: 15 } }}
      >
        <VictoryBar
          style={{ data: { fill: "tomato" }, labels: { fill: "white" } }}
          data={dataA}
          y={(data) => (-Math.abs(data.y))}
          labels={({ datum }) => (`${Math.abs(datum.y)}`)}
        />
        <VictoryBar
          style={{ data: { fill: "orange" }, labels: { fill: "white" } }}
          data={dataB}
          labels={({ datum }) => (`${Math.abs(datum.y)}`)}
        />
      </VictoryStack>

      <VictoryAxis
        style={{
          axis: { stroke: "transparent" },
          ticks: { stroke: "transparent" },
          tickLabels: { fontSize: 15, fill: "white" }
        }}
        tickLabelComponent={
          <VictoryLabel
            x={width / 2}
            textAnchor="middle"
          />
        }
        tickValues={dataA.map((point) => point.x).reverse()}
      />
    </VictoryChart>
  );
}

BestWorstChart.propTypes = {
  topPerformerStat: PropType.number,
  worstPerformerStat: PropType.number,
  category: PropType.string
};