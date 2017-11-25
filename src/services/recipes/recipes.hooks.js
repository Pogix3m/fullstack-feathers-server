

const recipes = require('../../hooks/recipes');
const {authenticate }= require('feathers-authentication').hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      // auth.verifyToken(),
      // auth.populateUser(),
      // auth.restrictToAuthenticated(),
      recipes()
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
