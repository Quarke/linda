

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ 
      function(hook){
        console.log(hook.data)

        console.log("Queries zoomed in")
        console.log(hook.data.queries)
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
