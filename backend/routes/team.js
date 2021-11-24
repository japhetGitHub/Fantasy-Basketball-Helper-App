const express = require('express');
const team = express.Router();
const db = require('../db');

// the base of this file is "http://localhost:3001/api/team" SO if you do a team.get("/", ...) 
// it's gonna answer to a request to "http://localhost:3001/api/team"



/* return all team from a user where his id is passed as a header 

quick note:   
  useEffect(() => {
    axios.get("http://localhost:3001/api/team/all", { headers: { 'user_id': theId}})
      .then((res) => setLiveGames(res.data));
  }, []);

OR if its a PUT or a POST: 
  useEffect(() => {
    axios.post("http://localhost:3001/api/team/all", { *this is the body so the data*}, { headers: { 'user_id': theId}})
      .then(() => console.log("post is completed"));
  }, []);
*/
team.get('/all', function(req, res) {
  // const user_id = req.headers["user_id"];
  // const query = {
  //   text: `SELECT * FROM teams WHERE user_id=${user_id}`
  // }
  // console.log('HELLO');
  // res.send('HELLO')
  return db 
    // .query(query)
    // console.log('HELLO')
    .query(`SELECT * FROM teams`)
    // res.json({data: result.rows}
    // .then (res.send())
    .then((result) => {
      console.log('RESULT', result)
      res.json({data: result.rows})
    })
    .catch((err) => err);
});



module.exports = team;
