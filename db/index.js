const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://lnpzytoztwnbdu:106e3de5d15291feb1e98814e943d2da50c3f88d2e76438d3e37321a347c868f@ec2-107-22-250-33.compute-1.amazonaws.com:5432/db6rsoddji4lk9',
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
  },

  pool: pool
}
