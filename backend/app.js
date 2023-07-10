require('dotenv').config();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const userRouter = require('./routes/user');
const itemsRouter = require('./routes/items');
const itemRouter = require('./routes/item');

const app = express();

// Cors
app.use(cors({
  origin: 'http://localhost:3030',
  credentials: true
}));

app.use(session({
  secret: process.env.SECRET_SESSION_PW,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    httpOnly: false,
    sameSite: 'strict'
  }
}));

// Set up mongoose connection
const mongoose = require('mongoose');
const dev_db_url = 'mongodb+srv://dbUser:Dk2dox9rwxXuF9BV@cluster0.jukbb.mongodb.net/PSI30?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/items', itemsRouter);
app.use('/item', itemRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
