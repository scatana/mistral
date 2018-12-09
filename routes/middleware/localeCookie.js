// Save the requested locale into a cookie if it differs from the current locale;
// the cookie should expire in one year
module.exports = (req, res, next) => {
  const requestedLocale = req.baseUrl.split('/')[1];
  const currentLocale = req.getLocale();

  if (requestedLocale !== currentLocale) {
    res.setLocale(requestedLocale);
    res.cookie('locale', requestedLocale, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // one year
    });
  }

  next();
};
