const chalk = require('chalk');
const  { fillNbaTeamsTable, fillPlayersTable, fillSeasonStatsTable, fillGameStatsTable, altFillGameStatsTable, seedSampleData } = require('./populateDb.js');

try {
  console.log( `-> Connecting to db ...` );

  fillNbaTeamsTable("test")
    .then(() => fillPlayersTable())
    .then(() => fillSeasonStatsTable())
    .then(() => altFillGameStatsTable())
    .then(() => seedSampleData("test"))
    .then(() => console.log(chalk.bgGreenBright("Finished seeding all sample data to all the databases!")))
    .catch((err) => {
      console.log(err);
    }).finally(() => process.exit());

} catch (err) {
  console.error(console.log( `Failed due to error: ${err}` ));
}