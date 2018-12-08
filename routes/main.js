const express = require('express');
const router = express.Router();

// Save the requested locale into a cookie if it differs from the current locale;
// the cookie should expire in one year; this happens for all routes that this
// router handles
router.use((req, res, next) => {
  const requestedLocale = req.baseUrl.split('/')[1];
  const currentLocale = req.getLocale();

  if (requestedLocale !== currentLocale) {
    res.setLocale(requestedLocale);
    res.cookie('locale', requestedLocale, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // one year
    });
  }

  next();
});

router.get('/', (req, res) => res.render('landing', {
  title: `${res.__('brand.name')} - ${res.__('brand.description')}, ${res.__('contact.city')}`,
  description: res.__('brand.service-description')
}));

module.exports = router;
