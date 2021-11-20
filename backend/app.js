const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// a quick start of the routing, might not be the good routes.
const teamRouter = require('./routes/team');

app.use('/api/team', teamRouter);

app.get('/api/authenticate');

// depend on the JWT
app.post('/api/login');
app.post('/api/register');

console.log("Listening on port 3001...");


app.listen(3001);

module.exports = app;
