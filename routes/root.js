const express = require('express');
const router = express.Router();

const hdlr = require('./handlers');

// redirect based on the detected locale
router.get('/', (req, res) => res.redirect(303, '/' + req.getLocale()));

// Google site verification
router.get('/googleac28af5e7ded36ba.html', (req, res) =>
  res.send('google-site-verification: googleac28af5e7ded36ba.html')
);

router.get('/sitemap.xml', hdlr.sitemap);

module.exports = router;
