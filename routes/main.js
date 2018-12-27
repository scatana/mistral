const express = require('express');
const i18n = require('i18n');

const mw = require('./middleware');
const hdlr = require('./handlers');

// Return a router that deals with localized routes
module.exports = locale => {
  const router = express.Router();

  // Update the cookie when necessary
  router.use(mw.localeCookie);

  // Landing page
  router.get('/', hdlr.landing);

  // Loop over all defined routes
  const routes = i18n.getCatalog(locale).routes;
  for (let route in routes) {
    router.get('/' + routes[route].path, hdlr[route]);
  }

  return router;
};
