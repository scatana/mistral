var express = require('express');
var router = express.Router();

/**
 * Save the requested locale into a cookie if it differs from the current locale;
 * the cookie should expire in one year; this happens for all routes that this
 * router handles
 */
router.use((req, res, next) => {
    var requestedLocale = req.baseUrl.split('/')[1];
    var currentLocale = req.getLocale();

    if (requestedLocale !== currentLocale) {
        res.setLocale(requestedLocale);

        res.cookie('locale', requestedLocale, {
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // one year
        });
    }

    next();
});

router.get('/', (req, res) => res.render('index'));

module.exports = router;
