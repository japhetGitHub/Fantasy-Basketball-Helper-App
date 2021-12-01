import React, { useEffect, useState } from "react";
import PropType from 'prop-types';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryStack } from "victory";

// const dataA = [
//   { x: "Personal Drones", y: 57 },
//   { x: "Smart Thermostat", y: 40 },
//   { x: "Television", y: 38 },
//   { x: "Smartwatch", y: 37 },
//   { x: "Fitness Monitor", y: 25 },
//   { x: "Tablet", y: 19 },
//   { x: "Camera", y: 15 },
//   { x: "Laptop", y: 13 },
//   { x: "Phone", y: 12 }
// ];

// const dataB = dataA.map((point) => {
//   const y = Math.round(point.y + 3 * (Math.random() - 0.5));
//   return { ...point, y };
// });

const width = 300;
const height = 30;

export default function BestWorstChart (props) {
  const [valueA, setValueA] = useState(0); // topPerformer stats
  const [valueB, setValueB] = useState(0); // worstPerformer stats

  const { topPerformerStat, worstPerformerStat, category } = props;
  console.log("1. HEREE TOP", topPerformerStat);
  console.log("3. HEREE WORST", worstPerformerStat);



  const dataA = [
    { x: category, y: valueA},
    // { x: "Assists", y: 20 },
    // { x: "Rebounds", y: 200 },
    // { x: "Steals", y: 30 },
  ];

  const dataB = [
    { x: category, y: valueB},
    // { x: "Assists", y: 120 },
    // { x: "Rebounds", y: 410 },
    // { x: "Steals", y: 5 },
  ];
  // Math.round(topPerformer.points)
  // Math.round(topPerformer.assists)
  // Math.round(topPerformer.rebounds)
  // Math.round(topPerformer.steals)
  // Math.round(worstPerformer.points)
  // Math.round(worstPerformer.assists)
  // Math.round(worstPerformer.rebounds)
  // Math.round(worstPerformer.steals)

  useEffect(() => {
    setValueA(Math.round(topPerformerStat) || 0);
    setValueB(Math.round(worstPerformerStat) || 0);
  }, [topPerformerStat, worstPerformerStat]);
  // useEffect(() => {
  //   setDataA([
  //     { x: "Points", y: topPerformer.points },
  //     { x: "Assists", y: topPerformer.assists },
  //     { x: "Rebounds", y: topPerformer.rebounds },
  //     { x: "Steals", y: topPerformer.steals },
  //   ]);
  //   setDataB([
  //     { x: "Points", y: worstPerformer.points },
  //     { x: "Assists", y: worstPerformer.assists },
  //     { x: "Rebounds", y: worstPerformer.rebounds },
  //     { x: "Steals", y: worstPerformer.steals },
  //   ]);
  // }, []);

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
        /*
          Use a custom tickLabelComponent with
          an absolutely positioned x value to position
          your tick labels in the center of the chart. The correct
          y values are still provided by VictoryAxis for each tick
        */
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