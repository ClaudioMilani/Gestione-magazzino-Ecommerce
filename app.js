var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fileUpload = require('express-fileupload');

var app = express();

/* SOCKET.IO */
// SOCKET IO SRV GLOBAL INIT
var ioMan = require('zzCustom/socketGlobal');
//var server = require('http').Server(app);
ioMan.server(app.listen(process.env.PORT || 3000, () => console.log('listening!')));
/* socketio */

app.use(session({
  secret: [
    'RU9ND5gMhjlgwrV3hO2Y',
    'SNh3N2rgU7nmi7goR2Rw',
    'VoDFBKuz4yOZhGjvXadz',
    'JSacdKJQKVsK9HctIplN',
    'C8oR1vxQIK4bKB6bovHa'
  ],
  secure: false, //true on https
  resave: false, //true may cause race condition
  saveUninitialized: true,
  cookie: {
    // secure: true // on https
  }
}));

var frontend = require('./routes/frontend');
var backend = require('./routes/backend');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

/* PARTE FRONTEND */
app.use('/', frontend);
app.use('/categoria', frontend);
app.use('/registrazione', frontend);
app.use('/prodotto', frontend);
app.use('/profilo', frontend);
app.use('/carrello', frontend);
/* PARTE FRONTEND */
/* PARTE BACKEND */
app.use('/amministrazione', backend);
app.use('/amministrazione/login', backend);
app.use('/amministrazione/menu', backend);
app.use('/amministrazione/categorie', backend);
app.use('/amministrazione/prodotti', backend);
app.use('/amministrazione/prodotto', backend);
/* PARTE BACKEND */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
