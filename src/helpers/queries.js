const db = require('../../db');
const Promise = require('bluebird');
const Combinatorics = require('js-combinatorics');

const days_of_week = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

module.exports.get_classes = (data, resolve, reject) => {
    let keyword = data.keyword;
    let crn = data.crn;
    let attributes = data.attributes;
    let building = data.building;
    let subjects = data.subjects;
    let start_after = data.start_after;
    let start_before = data.start_before;
    let max_cnum = data.max_cnum;
    let min_cnum = data.min_cnum;
    let m = data.m;
    let t = data.t;
    let w = data.w;
    let r = data.r;
    let f = data.f;
    let s = data.s;
    let n = data.n;
    let professor = data.professor;
    let professor_rating = data.professor_rating;

    let query_str = ""
    let from_array = new Set([`SELECT * FROM class`]);
    let where_array = []
    let var_str = ""

    from_array.add('professor');
    from_array.add('professor_class');
    where_array.push('professor_class.crn = class.crn');
    where_array.push('professor.email = professor_class.prof_email');

    if(professor) {
      professor_array = professor.split(' ');
      console.log(professor_array);
      var_str = [];
      for(name of professor_array) {
        var_str.push(`professor.name LIKE '%${name}%'`);
      }
      var_str = var_str.join(' OR ');
      var_str = '(' + var_str + ')';
      where_array.push(var_str);
    }
    if(professor_rating) {
      from_array.add('prof_reviews');
      from_array.add('professor_class');
      var_str = `avg_score >= '${professor_rating}' AND prof_reviews.prof_email = professor_class.prof_email`;
      where_array.push(var_str);
    }
    if(keyword) {
      var_str = `(description LIKE '%${keyword}%' OR title LIKE '%${keyword}%')`
      where_array.push(var_str)
    }
    if(crn) {
      var_str = `class.crn = '${crn}'`
      where_array.push(var_str)
    }
    if(max_cnum) {
      where_array.push(`course_number <= '${max_cnum}'`);
    }
    if(min_cnum) {
      where_array.push(`course_number >= '${min_cnum}'`);
    }
    if(attributes && attributes.length) {
      from_array.add(`class_attributes`)
      var_str = [];
      attributes.forEach((attr) => {
        var_str.push(`class_attributes.attr_code = '${attr}'`)
      })
      var_str = var_str.join(' OR ');
      var_str = '(' + var_str + ')';
      var_str += ' AND class_attributes.crn = class.crn'
      where_array.push(var_str)
    }
    if(building) {
      from_array.add(`class_meeting`)
      var_str = `class_meeting.building = '${building}'`
      where_array.push(var_str)
    }
    if(subjects && subjects.length) {
      var_str = [];
      subjects.forEach((subject) => {
        var_str.push(`class.subject = '${subject}'`)
      })
      var_str = var_str.join(' OR ');
      var_str = '(' + var_str + ')';
      where_array.push(var_str)
    }
    if(start_after) {
      from_array.add("class_meeting")
      where_array.push(`class_meeting.start_time >= '${start_after}'`)
    }
    if(start_before) {
      from_array.add("class_meeting")
      where_array.push(`class_meeting.start_time <= '${start_before}'`)
    }
    if(m === false) {
      from_array.add("class_meeting")
      where_array.push(`not class_meeting.monday and `);
    }
    if(t === false) {
      from_array.add("class_meeting")
      where_array.push(`not class_meeting.tuesday`);
    }
    if(w === false) {
      from_array.add("class_meeting")
      where_array.push(`not class_meeting.wednesday`);
    }
    if(r === false) {
      from_array.add("class_meeting")
      where_array.push(`not class_meeting.thursday`);
    }
    if(f === false) {
      from_array.add("class_meeting")
      where_array.push(`not class_meeting.friday`);
    }
    if(s === false) {
      from_array.add("class_meeting")
      where_array.push(`not class_meeting.saturday`);
    }
    if(n === false) {
      from_array.add("class_meeting")
      where_array.push(`not class_meeting.sunday`);
    }

    if (from_array.has("class_meeting")) {
      where_array.push("class_meeting.class_crn = class.crn");
    }
    query_str = Array.from(from_array).join(", ")
    query_str += " WHERE "
    query_str += where_array.join(" AND ")
    query_str += " ORDER BY class.crn";

    if(query_str.length > 0){
      console.log(query_str)
      db.query(query_str, [], (res) => {
        res = res.rows;
        data = [];
        for (let i=0; i < res.length; i++) {
          let val = res[i];
          val.attributes = new Set();
          for (let j = i; j < res.length; j++) {
            if (res[j].crn != res[i].crn) {
              i = j-1; // need -1 or else we skip classes
              break;
            } else {
              days_of_week.forEach((day) => {
                if (res[j][day]) {
                  val[day] = {
                    start_time: res[j].start_time,
                    end_time: res[j].end_time,
                    building: res[j].building,
                    room: res[j].room
                  };
                }
              })
              if (res[j].attr_code) {
                val.attributes.add(res[j].attr_code);
                if (val.attributes.length > 1) {
                  console.log("ATTRSSSSSS", val);
                }
              }
            }
          }
          delete val.start_time;
          delete val.end_time;
          delete val.room;
          delete val.building;
          delete val.attr_code;
          days_of_week.forEach((day) => {
            val[day] = val[day] || null;
          })
          val.attributes = Array.from(val.attributes);
          data.push(val);
        }
        resolve(data)
      })
    }
    else {
      resolve([])
    }
}

module.exports.make_schedule = (data, params, resolve, reject) => {
  let class_promises = Promise.map(data.queries, (c) => {
    return new Promise( (resolve, reject) => {
      c.start_after = data.min_time || '0:00';
      c.start_before = data.max_time || '23:59';
      c.m = data.monday;
      c.t = data.tuesday;
      c.w = data.wednesday;
      c.r = data.thursday;
      c.f = data.friday;
      c.s = data.saturday;
      c.n = data.sunday;
      module.exports.get_classes(c, resolve, reject)
    })
  })

  Promise.all(class_promises)
    .then((class_results) => {
      class_results = class_results.filter((c) => c.length);
      let coms = Combinatorics.cartesianProduct(...class_results);
      console.log("num coms", coms.length);
      let result = coms.filter(isValidSchedule);
      console.log("result len", result.length);
      let res = [];
      let used = new Set();
      if (result.length < 500) {
        console.log("shuffling");
        for (i = result.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = result[i];
          result[i] = result[j];
          result[j] = x;
        }
        for (let r of result) {
          res.push(r);
        }
      } else {
        for (let i = 0; i < 500; ++i) {
          let k = Math.floor(Math.random() * result.length);
          while (used.has(k)) {
            k = Math.floor(Math.random() * result.length);
          }
          used.add(k);
          res.push(result[k]);
        }
      }
      resolve({
        data: res,
        total: result.length,
        actual: res.length
      });
    }).catch(reject);
}

let filter_index = 0;

isValidSchedule = (classes) => {
  filter_index++;
  if (filter_index % 1000000 == 0) console.log(filter_index);
  if (classes.length == 1) return true;
  if (classes.length == 0) return false;

  for (let day of days_of_week) {
    days_classes = classes.filter((c) => { return c[day] != null });
    days_classes.sort((a,b) => {
      if (a[day].start_time < b[day].start_time) {
        return -1;
      } else if (a[day].start_time == b[day].start_time) {
        return 0;
      } else {
        return 1;
      }
    })
    for (let i=1; i < days_classes.length; i++) {
      if (days_classes[i-1][day].end_time > days_classes[i][day].start_time) {
        return false;
      }
    }
  }
  return true;
}
