# Fantasy-Basketball-Helper-App
A mobile-first web app that allows users to see rich basketball data/statistics for their fantasy teams all at-a-glance. This data is often found in scattered sources and can take time to analyze. This app centralizes the most important of these data points and displays them using easily understood data visualizations. Consequently, users can make more informed and competitive lineup decisions in a much shorter amount of time.

This app is designed to be a complementary tool for the fantasy basketball experience.

## Tech Stack
The architecture is a Single-Page App that uses Javascript for the full stack. React is used in the frontend, Express in the backend, and PostgreSQL for the database.

Visual elements were sourced from the Material UI library and styled using the Styled Components tool. Knex.js was used to build flexible and portable database queries. JSON Web Tokens (JWT), specifically implemented using Access Tokens and Refresh Tokens, were used to authenticate users and protect routes.

>Frontend: [React](https://reactjs.org/), [Material UI](https://mui.com/), [Styled Components](https://styled-components.com/), [Axios](https://axios-http.com/), [Victory](https://formidable.com/open-source/victory/), [React-Swipeable-Views](https://react-swipeable-views.com/)

>Backend: [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/), [JSON Web Tokens by Auth0](https://github.com/auth0/node-jsonwebtoken), [PostgreSQL](https://node-postgres.com/), [Knex.js](https://knexjs.org/), [Axios](https://axios-http.com/)

Note: NBA data is sourced from sportsdata.io and all fantasy stats currently follow Yahoo Fantasy Sports.

# Getting Started
## Setup - Upon first install
1. In the root of the project run `createdb fantasy_basket -O labber` in your terminal to create the database for the first time.  
2. `cd` into the **/frontend** and **/backend** folders and run `npm install` in each of them to install dependencies
3. create an .env file in the backend based on the .env.example file found there.
    - Run `require('crypto').randomBytes(64).toString('hex')` in your terminal and paste the result into the `TOKEN_SECRET` environment variable. 
    - Run the command again, this time pasting the new random string into the `REFRESH_TOKEN_SECRET` environment variable.
    - Register on https://sportsdata.io/ and retrieve an api key, putting it into the `SPORTS_API_KEY` environment variable.
4. run `npm run db:reset` in the **/backend** folder to initialize the database schema.
5. run `npm run db:seed` in the **/backend** folder to seed the database with data from sportsdata.io

## Running the project (after setup)
1. `cd` into the **/backend** folder and run `npm run dev` in the terminal to start the backend server.
2. `cd` into the **/frontend** folder and run `npm start` in the terminal to start the frontend react app.
3. navigate to http://localhost:3000 in your browser to use the web app.

# Screenshots
|Landing Page |
|---|
|![landing page](https://github.com/japhetGitHub/Fantasy-Basketball-Helper-App/blob/main/screenshots/landing_page.png?raw=true)|

|All Teams |Specific Team Overview|
|---|---|
|![all teams page](https://github.com/japhetGitHub/Fantasy-Basketball-Helper-App/blob/main/screenshots/all_teams.gif?raw=true)|![specific team overview page](https://github.com/japhetGitHub/Fantasy-Basketball-Helper-App/blob/main/screenshots/team_overview.gif?raw=true)|


|Manage Players |Player Stats |
|---|---|
|![manage players page](https://github.com/japhetGitHub/Fantasy-Basketball-Helper-App/blob/main/screenshots/manage_players.gif?raw=true)|![starting lineup player stats page](https://github.com/japhetGitHub/Fantasy-Basketball-Helper-App/blob/main/screenshots/player_stats.gif?raw=true)|

# Additional (stretch) goals
- Add more data visualizations that incorporate advanced stats in meaningful and approachable ways.
- Add experiences that enable more dynamic lineup experimentation across multiple vectors of data.
- Improve desktop UI/UX.
- Add functionality that allows users to more easily import their fantasy team data from popular fantasy basketball platforms.
