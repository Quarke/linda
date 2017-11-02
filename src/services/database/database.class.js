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

    console.log(keyword)
    console.log(crn)
    console.log(attribute)
    console.log(building)
    console.log(subject)
    console.log(query_str)

    if (keyword){
      query_str = `SELECT * FROM class WHERE description LIKE '%${keyword}%' OR title LIKE '%${keyword}%'`
    }
    if(subject){
      query_str = `SELECT * FROM class, subject WHERE class.subject = '${subject}' AND class.subject = subject.abbreviation`
    }
    if(building){
      query_str = `SELECT * FROM class, class_meeting WHERE class.crn = class_meeting.class_crn AND class_meeting.building = '${building}'`
    }
    if(crn){
      query_str = `SELECT * FROM class WHERE crn = '${crn}'`
    }
    if(attribute){
      query_str = `SELECT * FROM class_attributes, class WHERE class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn`
    }
    if(keyword && subject){
      query_str = `SELECT * FROM class, subject WHERE class.subject = '${subject}' AND class.subject = subject.abbreviation AND (class.description LIKE '%${keyword}%' OR class.title LIKE '%${keyword}%')`
    }
    if(keyword && building){
      query_str = `SELECT * FROM class, class_meeting WHERE class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND (class.description LIKE '%${keyword}%' OR class.title LIKE '%${keyword}%')`
    }
    if(keyword && crn){
      query_str = `SELECT * FROM class WHERE (description LIKE '%${keyword}%' OR title LIKE '%${keyword}%') AND crn = '${crn}'`
    }
    if(keyword && attribute){
      query_str = `SELECT * FROM class_attributes, class WHERE class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn AND (class.description LIKE '%${keyword}%' OR class.title LIKE '%${keyword}%')`
    }
    if(subject && building){
      query_str = `SELECT * FROM class, subject, class_meeting WHERE class.subject = '${subject}' AND class.subject = subject.abbreviation AND class.crn = class_meeting.class_crn AND class_meeting.building = '${building}'`
    }
    if(subject && crn){
      query_str = `SELECT * FROM class, subject WHERE class.subject = '${subject}' AND class.subject = subject.abbreviation`
    }
    if(subject && attribute){
      query_str = `SELECT * FROM class, subject, class_attributes WHERE class.subject = '${subject}' AND class.subject = subject.abbreviation AND class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn`
    }
    if(building && crn){
      query_str = `SELECT * FROM class, class_meeting WHERE class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' and class.crn = '${crn}'`
    }
    if(building && attribute){
      query_str = `SELECT * FROM class, class_meeting, class_attributes WHERE class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn`
    }
    if(crn && attribute){
      query_str = `SELECT * FROM class_attributes, class WHERE class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn AND class.crn = '${crn}'`
    }
    if(keyword && subject && building){
      query_str = `SELECT * FROM class, subject, class_meeting WHERE class.subject = '${subject}' AND class.subject = subject.abbreviation AND class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND (class.description LIKE '%${keyword}%' OR class.title LIKE '%${keyword}%')`
    }
    if(keyword && subject && crn){
      query_str = `SELECT * FROM class, subject WHERE (description LIKE '%${keyword}%' OR title LIKE '%${keyword}%') AND class.subject = '${subject}' AND class.subject = subject.abbreviation AND class.crn = '${crn}'`
    }
    if(keyword && subject && attribute){
      query_str = `SELECT * FROM class, subject, class_attributes WHERE class.subject = '${subject}' AND class.subject = subject.abbreviation AND (class.description LIKE '%${keyword}%' OR class.title LIKE '%${keyword}%') AND class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn`
    }
    if(keyword && building && crn){
      query_str = `SELECT * FROM class, class_meeting WHERE class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND (class.description LIKE '%${keyword}%' OR class.title LIKE '%${keyword}%') AND class.crn = '${crn}' AND class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn`
    }
    if(keyword && building && attribute){
      query_str = `SELECT * FROM class, class_meeting, class_attributes WHERE class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND (class.description LIKE '%${keyword}%' OR class.title LIKE '%${keyword}%') AND class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn`
    }
    if(keyword && crn && attribute){
      query_str = `SELECT * FROM class, class_attributes WHERE (description LIKE '%${keyword}%' OR title LIKE '%${keyword}%') AND crn = '${crn}' AND class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn`
    }
    if(subject && building && crn){
      query_str = `SELECT * FROM class, subject, class_meeting WHERE class.subject = '${subject}' AND class.subject = subject.abbreviation AND class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND class.crn = '${crn}'`
    }
    if(subject && building && attribute){
      query_str = `SELECT * FROM class, class_meeting, class_attributes, subject WHERE class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn AND class.subject = '${subject}' AND class.subject = subject.abbreviation`
    }
    if(building && crn && attribute){
      query_str = `SELECT * FROM class, class_meeting, class_attributes WHERE class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn AND class.crn = '${crn}'`
    }
    if(keyword && subject && building && crn){
      query_str = `SELECT * FROM class, subject, class_meeting WHERE class.subject = '${subject}' AND class.subject = subject.abbreviation AND class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND (class.description LIKE '%${keyword}%' OR class.title LIKE '%${keyword}%') AND class.crn = '${crn}'`
    }
    if(keyword && subject && crn && attribute){
      query_str = `SELECT * FROM class, subject, class_attributes WHERE class.subject = '${subject}' AND class.subject = subject.abbreviation AND (class.description LIKE '%${keyword}%' OR class.title LIKE '%${keyword}%') AND class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn AND class.crn = '${crn}'`
    }
    if(keyword && building && crn && attribute){
      query_str = `SELECT * FROM class, class_meeting, class_attributes WHERE class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn AND class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND (class.description LIKE '%${keyword}%' OR class.title LIKE '%${keyword}%') AND class.crn = '${crn}'`
    }
    if(subject && building && crn && attribute){
      query_str = `SELECT * FROM class, class_meeting, class_attributes, subject WHERE class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn AND class.subject = '${subject}' AND class.subject = subject.abbreviation AND class.crn = '${crn}'`
    }
    if(subject && building && keyword && attribute){
      query_str = `SELECT * FROM class, class_meeting, class_attributes, subject WHERE (description LIKE '%${keyword}%' OR title LIKE '%${keyword}%') AND class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn AND class.subject = '${subject}' AND class.subject = subject.abbreviation`
    }
    if(subject && keyword && building && crn && attribute){
      query_str = `SELECT * FROM class, class_meeting, class_attributes, subject WHERE (description LIKE '%${keyword}%' OR title LIKE '%${keyword}%') AND class.crn = class_meeting.class_crn AND class_meeting.building = '${building}' AND class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn AND class.subject = '${subject}' AND class.subject = subject.abbreviation AND class.crn = '${crn}'`
    }

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
