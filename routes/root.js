const express = require('express');
const router = express.Router();

const handlers = require('./handlers');

// redirect based on the detected locale
router.get('/', (req, res) => res.redirect(303, '/' + req.getLocale()));

// Google site verification
router.get('/googleac28af5e7ded36ba.html', (req, res) =>
  res.send('google-site-verification: googleac28af5e7ded36ba.html')
);

// Bing site verification
router.get('/BingSiteAuth.xml', (req, res) => {
  res.send(`<?xml version="1.0"?>
<users>
  <user>E0E065F476E596BEACAFC9F4BFF84E58</user>
</users>`);
});

router.get('/sitemap.xml', handlers.sitemap);

module.exports = router;
