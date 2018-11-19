const createError = require('http-errors');
const express = require('express');
const hbs = require('hbs');
const i18n = require('i18n');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// configure i18n
i18n.configure({
    locales: ['en', 'fr', 'ro'],
    defaultLocale: 'en',
    cookie: 'locale',
    directory: path.join(__dirname, 'i18n'),
    updateFiles: false,
    extension: '.json'
});

// view engine helpers
const pkgInfo = require('./package.json');
const assetsMountPoint = path.join('/assets', pkgInfo.version);
hbs.registerHelper('asset', (assetPath) => {
	return path.join(assetsMountPoint, assetPath);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// miscelaneous
app.set('x-powered-by', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);
app.use(assetsMountPoint, express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
