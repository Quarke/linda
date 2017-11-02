const db = require('../db');

// Get building names
db.query('SELECT * FROM building', [], (res) => {
  console.log('result of query', res);
});

var buildingName = ['Flanagan Hall'];


//Insert new building
// db.query('INSERT INTO building (name) VALUES ($1)', buildingName, (res) => {
//   console.log('result of query', res);
// });


// //Delete building
// db.query('DELETE FROM building WHERE name = $1', buildingName, (res) => {
//   console.log('result of query', res);
// });
