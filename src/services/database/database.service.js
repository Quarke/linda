// Initializes the `database` service on path `/database`
const createService = require('./database.class.js');
const hooks = require('./database.hooks');
const filters = require('./database.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'database',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/database', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('database');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
