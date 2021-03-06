const express = require('express');
const i18n = require('i18n');

const mw = require('./middleware');
const handlers = require('./handlers');

// Return a router that deals with localized routes
module.exports = locale => {
  const router = express.Router();

  // Update the cookie when necessary
  router.use(mw.localeCookie);

  // Landing page
  router.get('/', handlers.landing);

  // Loop over all defined routes
  const routes = i18n.getCatalog(locale).routes;

  for (let route in routes) {
    const routeType = routes[route]._type;

    router[routeType]('/' + routes[route].path, handlers[route]);
  }

  return router;
};
