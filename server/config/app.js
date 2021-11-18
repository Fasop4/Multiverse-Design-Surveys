/*
Author: Multiverse Design
Date: Nov-17-2021
FileName : app.js

*/

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

//Modules for authentication
let session = require('express-session');
let pass = require('passport');
//JWT
let passportJWT = require('passport-jwt');
let JWTStrat = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//database setup

let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
    console.log('Connected to MongoDB succesfully');
});

//declaration of routers
let indexRouter = require('../routes/index');
let surveyRouter = require('../routes/survey');
let userRouter = require('../routes/user'); //TODO complete

//routing
app.use('/', indexRouter);
app.use('/surveys', surveyRouter);
app.use('/user', userRouter); //TODO for later implementation of user

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
app.use(session({
    secret: "MultiV3rs36",
    saveUninitialized: false,
    resave: false
}));

// initialize flash
app.use(flash()); 

// initialize passport
app.use(pass.initialize());
app.use(pass.session());

// configuration of passport user

// serialize and deserialize the User info
pass.serializeUser(User.serializeUser());
pass.deserializeUser(User.deserializeUser());

// verify that the token sent by the user - check if valid
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.secret;
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(strategy);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: 'Error' });
});

module.exports = app;