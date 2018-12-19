const express = require('express');
const i18n = require('i18n');

// Return a router that deals with localized routes
module.exports = locale => {
  const router = express.Router();

  router.use(require('./middleware/localeCookie'));

  // Landing page
  router.get('/', require('./handlers/landing'));

  // Loop over all defined routes
  const routes = i18n.getCatalog(locale).routes;
  for (let route in routes) {
    router.get('/' + routes[route].path, require('./handlers/' + route));
  }

  return router;
};
