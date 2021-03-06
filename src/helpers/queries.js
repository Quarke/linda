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
    let professor_rating = data.professor_rating || 0;
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
    if(professor_rating !== null && professor_rating !== undefined) {
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
      if(class_results.length == 0) {
        resolve({data: [], total: 0, actual: 0});
        return;
      }
      let coms = Combinatorics.cartesianProduct(...class_results);
      let result = coms.filter(isValidSchedule);
      let res = [];
      let used = new Set();
      if (result.length < 500) {
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
      return Promise.props({
        data: Promise.map(res, (schedule) => {
          return Promise.props({
            classes: schedule,
            rating: schedule.filter((cls) => {
              return cls.avg_score !== undefined;
            }).reduce((acc, cls, ind, arr) => {
              let x = acc + (cls.avg_score / arr.length);
              return x;
            }, 0),
            distance: Promise.reduce(days_of_week, (totalDistance, day, index, length) => {
              let days_classes = schedule.filter((c) => { return c[day] != null });
              days_classes.sort((a,b) => {
                if (a[day].start_time < b[day].start_time) {
                  return -1;
                } else if (a[day].start_time == b[day].start_time) {
                  return 0;
                } else {
                  return 1;
                }
              })
              return Promise.reduce(days_classes, (innerDistance, cl, index, length) => {
                if(index >= length - 1) {
                  return innerDistance;
                }
                return db.pool.query("SELECT * FROM distance_from WHERE building1 = $1 AND building2 = $2", [cl[day].building, days_classes[index+1][day].building]).then((resp) => {
                  resp = resp.rows;
                  // if same building
                  if(resp.length == 0) {
                    return innerDistance;
                  }
                  else if(resp[0].distance_miles != "NaN") {
                    return innerDistance + parseFloat(resp[0].distance_miles);
                  }
                  // if Nan distance
                  return innerDistance + .1;
                });
              }, 0).then((innerDistance) => {return totalDistance + innerDistance; });
            }, 0).then((total) => { return total; })
          })
        }),
        total: result.length,
        actual: res.length
      });
    })
    .then((res) => {
      console.log('hi mom', res);
      resolve(res);
    })
    .catch(reject);
}

let filter_index = 0;

isValidSchedule = (classes) => {
  filter_index++;
  if (filter_index % 1000000 == 0) console.log(filter_index);
  if (classes.length == 1) return true;
  if (classes.length == 0) return false;

  for (let day of days_of_week) {
    let days_classes = classes.filter((c) => { return c[day] != null });
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
