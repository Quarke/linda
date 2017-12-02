/* eslint-disable no-unused-vars */
const db = require('../../../db')

function get_query(data, resolve, reject){
    console.log(data)

    let keyword = data.query.keyword
    let crn = data.query.crn
    let attribute = data.query.attribute
    let building = data.query.building
    let subject = data.query.subject
    let query_str = ""
    let select_array = [`SELECT * FROM class`]
    let where_array = []
    let var_str = ""
    if(keyword) {
      var_str = `(description LIKE '%${keyword}%' OR title LIKE '%${keyword}%')`
      where_array.push(var_str)
    }
    if(crn) {
      var_str = `class.crn = '${crn}'`
      where_array.push(var_str)
    }
    if(attribute) {
      select_array.push(`class_attributes`)
      var_str = `class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn`
      where_array.push(var_str)
    }
    if(building) {
      select_array.push(`class_meeting`)
      var_str = `class.crn = class_meeting.class_crn AND class_meeting.building = '${building}'`
      where_array.push(var_str)
    }
    if(subject) {
      select_array.push(`subject`)
      var_str = `class.subject = '${subject}' AND class.subject = subject.abbreviation`
      where_array.push(var_str)
    }

    query_str = select_array.join(", ")
    query_str += " WHERE "
    query_str += where_array.join(" AND ")

    console.log(query_str)

    if(query_str.length > 0){
      console.log(query_str)
        db.query(query_str, [], (res) => {
          resolve(res)
      })
    }
    else {
      resolve("No returns")
    }
}

class Service {
  constructor (options) {
    this.options = options || {};
  }

  find (params) {
    return new Promise( (resolve, reject) => {
      get_query(params, resolve, reject)
    })
  }


  get (id, params) {
    return new Promise( (resolve, reject) => {
       db.query('SELECT * FROM building', [], (res_building) => {
        db.query('SELECT * FROM subject', [], (res_subject) => {
          db.query('SELECT * FROM attribute', [], (res_attri) => {
          resolve({
            buildings: res_building, subjects: res_subject, attributes: res_attri
          })
        })
      })
    })
  })
  }

  create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update (id, data, params) {
    return Promise.resolve(data);
  }

  patch (id, data, params) {
    return Promise.resolve(data);
  }

  remove (id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
