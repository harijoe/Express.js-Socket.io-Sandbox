// Express.js + socket.io

// Dependencies setup
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
var debug = require('debug')('generated-express-app');
var routes = require('./routes/index');

// Server setup
var app = express();
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

// Include routes
app.use('/', routes);

// Socket.io
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    console.log('IO Connected (bottom)');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Requests
/*app.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});
*/

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;