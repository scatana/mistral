const createError = require('http-errors');
const express = require('express');
const nunjucks = require('nunjucks');
const i18n = require('i18n');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// configure i18n
i18n.configure({
  locales: [ 'en', 'fr', 'ro' ],
  defaultLocale: 'en',
  cookie: 'locale',
  directory: path.join(__dirname, 'i18n'),
  updateFiles: false,
  objectNotation: true
});

// enable view engine (nunjucks)
const pkgInfo = require('./package.json');
const assetsMountPoint = path.join('/assets', pkgInfo.version);
const env = nunjucks.configure('views', {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
  express: app
});

// nunjucks filters
env.addFilter('asset', assetPath => path.join(assetsMountPoint, assetPath));

// configure view engine (nunjucks)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// miscelaneous
app.set('x-powered-by', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);
app.use(assetsMountPoint, express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/en', require('./routes/main')('en'));
app.use('/fr', require('./routes/main')('fr'));
app.use('/ro', require('./routes/main')('ro'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
