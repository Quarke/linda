const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://mikzgdxuejpmys:11bc15e94ab74ccd8bc2770b67f0c775cd38195d30a6bd0145890082e8ab800b@ec2-54-163-245-150.compute-1.amazonaws.com:5432/d1uobgd9g5lr4q',
  ssl: true,
});

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      if(err) {
        console.log('err', err);
      } else {
        const duration = Date.now() - start;
        console.log('executed query', { text, duration, rows: res.rowCount });
        callback(res);
      }
    })
  }
}
