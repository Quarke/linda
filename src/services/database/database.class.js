/* eslint-disable no-unused-vars */
const db = require('../../../db');
const queries = require('../../helpers/queries');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  find (params) {
    return new Promise( (resolve, reject) => {
      if (params.query.subject) params.query.subjects = [params.query.subject];
      if (params.query.attribute) params.query.attributes = [params.query.attribute];
      queries.get_classes(params.query, resolve, reject)
    })
  }


  get (id, params) {
    return new Promise( (resolve, reject) => {
      db.query('SELECT * FROM building ORDER BY building', [], (res_building) => {
        db.query('SELECT * FROM subject ORDER BY subject', [], (res_subject) => {
          db.query('SELECT * FROM attribute ORDER BY attribute', [], (res_attri) => {
            resolve({
              buildings: res_building, subjects: res_subject, attributes: res_attri
            })
          })
        })
      })
    })
  }

  create (data, params) {
    return new Promise((resolve, reject) => {
      queries.make_schedule(data, params, resolve, reject)
    })
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
