'use strict';

const serializeUser = require('./serialize-user');
const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  create: [
    auth.hashPassword()
  ],
  update: hooks.disable(),
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth(),
    auth.restrictToSelf()
  ],
  remove: hooks.disable()
};

exports.after = {
  all: [serializeUser()],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
