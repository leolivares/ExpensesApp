const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const jwt = require('express-jwt');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

const app = express();

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

  console.log(err.message);

  // render the error page
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid Token');
  } else if (err.message === 'Invalid Email/Password') {
    console.log("Send");
    res.status(402).send('Invalid Email/Password');
  } else {
    res.status(err.status || 500);
    res.send(err.message);
  }


});

module.exports = app;
