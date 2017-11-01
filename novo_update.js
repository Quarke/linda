const fs = require('fs');
const ProgressBar = require('progress');
const { Client } = require('pg');
const Promise = require('bluebird');

const db = new Client({
  connectionString: 'postgres://mikzgdxuejpmys:11bc15e94ab74ccd8bc2770b67f0c775cd38195d30a6bd0145890082e8ab800b@ec2-54-163-245-150.compute-1.amazonaws.com:5432/d1uobgd9g5lr4q',
  ssl: true,
});
db.connect();
var bar;

function run(data) {
  return Promise.map(data, (c) => {
    return Promise.all(
      [
        db.query('INSERT INTO subject VALUES($1, $2) ON CONFLICT DO NOTHING', [c.subject, c.subjectDescription])
          .catch(),
        db.query('UPDATE class SET section = $1 WHERE crn = $2', [c.sequenceNumber, c.courseReferenceNumber])
          .catch(),
        Promise.map(c.meetingsFaculty, (meeting) => {
          let time = meeting.meetingTime;

          return Promise.all(
            [
              db.query('INSERT INTO class_meeting(class_crn, start_time, end_time, monday, tuesday, wednesday, thursday, friday, saturday, sunday, building, room) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT DO NOTHING',
                [
                  meeting.courseReferenceNumber,
                  convertTime(time.beginTime),
                  convertTime(time.endTime),
                  time.monday,
                  time.tuesday,
                  time.wednesday,
                  time.thursday,
                  time.friday,
                  time.saturday,
                  time.sunday,
                  time.buildingDescription,
                  time.room
                ]
              )
                .catch(),
              time.buildingDescription ? db.query('INSERT INTO building VALUES($1) ON CONFLICT DO NOTHING', [time.buildingDescription]) : Promise.resolve()
                .catch(),
            ]
          );
        }),
        Promise.map(c.faculty, (prof) => {
          return Promise.all(
            [
              db.query('INSERT INTO professor VALUES($1, $2) ON CONFLICT DO NOTHING', [prof.displayName, prof.emailAddress])
                .catch(),
              db.query('INSERT INTO professor_class VALUES($1, $2) ON CONFLICT DO NOTHING', [prof.courseReferenceNumber, prof.emailAddress])
                .catch(),
            ]);
        })

      ]
    ).then(() => {
      bar.tick();
    }); 
  }).then(() => {
    // done with file
  }).catch((err) => {
    console.log(`Error: ${err.stack || err}`);
  });
}


function convertTime(time) {
  if (!time) return null;
  return `${time.substring(0,2)}:${time.substring(2,4)}:00`;
}

let arr = [];
for (let i = 0; i <= 9160; i+=10) {
  arr.push(i);
}

Promise.each(arr, (i) => {
  let raw = fs.readFileSync(`novo${i}.json`);
  bar = bar || new ProgressBar(':bar :current/:total :eta s remaining', {total: JSON.parse(raw).totalCount});
  let data = JSON.parse(raw).data;
  console.log(`novo${i}.json`);
  return run(data);
}).then(() => {db.end();});
