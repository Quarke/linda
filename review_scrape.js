const { Client } = require('pg');
const querystring = require("querystring");
const ProgressBar = require('progress');
const async = require('async');
const request = require('request');
const cheerio = require('cheerio');

const db = new Client({
  connectionString: 'postgres://lnpzytoztwnbdu:106e3de5d15291feb1e98814e943d2da50c3f88d2e76438d3e37321a347c868f@ec2-107-22-250-33.compute-1.amazonaws.com:5432/db6rsoddji4lk9',
  ssl: true,
});
db.connect();

const grades_to_number = {
  'A+': 5,
  'A': 5,
  'A-': 4.67,
  'B+': 4.33,
  'B': 4,
  'B-': 3.67,
  'C+': 3.33,
  'C': 3,
  'C-': 2.67,
  'D+': 2.33,
  'D': 2,
  'D-': 1.67,
  'F+': 1.33,
  'F': 1
}

db.query('SELECT name, email from professor', [], (err, res) => {
  let bar = new ProgressBar(':bar :percent :eta s remaining', {total: res.rows.length});
  async.eachLimit(res.rows, 5,
    (prof, next) => {
      let name = prof.name;
      let email = prof.email;
      let url = `http://www.ndreviews.com/instructor_info/${querystring.escape(name)}`
      request(url, function (error, response, body) {
        if (response.statusCode != 200) {
          bar.tick();
          next(null);
        }
        const $ = cheerio.load(body);
        let rows = $('table.striped').eq(0).children('tbody').children('tr');
        let numReviews = parseInt(rows.eq(-1).children('td').eq(-1).text());

        let obj = {};
        obj['num_reviews'] = numReviews;
        obj['prof_email'] = email;
        obj['link_url'] = url;
        if (numReviews > 0) {
          let grades = rows.map((i, row) => grades_to_number[$(row).children('td').eq(-1).text()]).get();
          let average = grades.reduce((a,b) => a+b)/grades.length;
          obj['avg_score'] = average;
          db.query('INSERT INTO prof_reviews(num_reviews, prof_email, link_url, avg_score) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING', [obj.num_reviews, obj.prof_email, obj.link_url, obj.avg_score], (err) => {
            if (err) {
              console.log(err);
            }
            bar.tick();
            next(null);
          })
        } else {
          db.query('INSERT INTO prof_reviews(num_reviews, prof_email, link_url) VALUES($1, $2, $3) ON CONFLICT DO NOTHING', [obj.num_reviews, obj.prof_email, obj.link_url], (err) => {
            if (err) {
              console.log(err);
            }
            bar.tick();
            next(null);
          })
        }
      });
    },
    () => {
      db.end();
    }
  )
})
