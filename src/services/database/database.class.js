/* eslint-disable no-unused-vars */
const db = require('../../../db')

class Service {
  constructor (options) {
    this.options = options || {};
  }

  find (params) {
    return new Promise( (resolve, reject) => {
      queries.get_classes(params, resolve, reject)
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
