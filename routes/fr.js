const express = require('express');
const router = express.Router();
const i18n = require('i18n');

router.use(require('./middleware/localeCookie'));

// Landing page
router.get('/', require('./handlers/landing'));

let routes = i18n.getCatalog('fr').routes;

// Loop over all defined routes
for (let route in routes) {
  router.get('/' + routes[route], require('./handlers/' + route));
}

module.exports = router;
