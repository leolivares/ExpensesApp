var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var jwt = require('express-jwt');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var expensesRouter = require('./routes/expenses');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwt({ secret: process.env.TOKEN_SECRET, algorithms: ['HS256']}).unless(
  { path: ['/users/auth', 
           '/users/create'] }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/expenses', expensesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('Error handling');
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid Token');
  }

  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
