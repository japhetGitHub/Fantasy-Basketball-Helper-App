import LatestGame from "./statCards/LatestGame";
import SeasonAverage from "./statCards/SeasonAverage";
import FantasyPointsTrend from "./statCards/FantasyPointsTrend";
import OvsDRebounds from "./statCards/OvsDRebounds";
import LastWeekRadar from "./statCards/LastWeekRadar";
// should return an array of stats cards that will be imported into the useThat prop of ListItem in StartingLineups which ListItem pipes into Carousel
// this component should be the aggregate/list of a bunch of sub components (list items) for each card
export default function playerStats(latestGameData, seasonStats, playerSeasonFanPoints, pastWeekData) {
  const statCards = [
    <LatestGame key={0} num={0} data={latestGameData} />,
    <SeasonAverage key={1} num={1} data={seasonStats} />,
    <FantasyPointsTrend key={2} data={playerSeasonFanPoints} />,
    <OvsDRebounds key={3} data={seasonStats} />,
    <LastWeekRadar key={4} pastWeekData={pastWeekData} seasonStats={seasonStats} />
  ];

  return statCards;
}