const createError = require('http-errors');
const express = require('express');
const nunjucks = require('nunjucks');
const i18n = require('i18n');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const rootRouter = require('./routes/root');
const mainRouter = require('./routes/main');

const isDev = process.env.NODE_ENV === 'development';

const app = express();

// configure i18n
i18n.configure({
  locales: [ 'en', 'fr', 'ro' ],
  defaultLocale: 'en',
  cookie: 'locale',
  directory: path.join(__dirname, 'i18n'),
  updateFiles: isDev,
  syncFiles: isDev,
  indent: '  '
});

// configure nunjucks
const env = nunjucks.configure('views', {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
  express: app
});
const pkgInfo = require('./package.json');
const assetsMountPoint = path.join('/assets', pkgInfo.version);

// nunjucks filters
env.addFilter('asset', assetPath => path.join(assetsMountPoint, assetPath));

// view engine (nunjucks)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

// miscelaneous
app.set('x-powered-by', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);
app.use(assetsMountPoint, express.static(path.join(__dirname, 'public')));

app.use('/', rootRouter);
app.use(['/en', '/fr', '/ro'], mainRouter);

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
