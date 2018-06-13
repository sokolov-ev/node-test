const express      = require('express');
const app          = express();
const path         = require('path');
const logger       = require('morgan');
const bodyParser   = require('body-parser');

// App root directory
global.appRoot = __dirname;
global._ = require('lodash');
global.Promise = require('bluebird');

// mongoose setup
const mongoose = require('mongoose');

// Init mongoose
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/file_storage');

if (app.get('env') === 'development') {
    app.use(logger('dev'));
}

app.use(bodyParser.json({
    limit: '100mb'
}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '100mb'
}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./server/index.js'));

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.
app.use(function (req, res, next) {
    res.status(404);

    // respond with json
    if (req.accepts('json')) {
        res.send({error: 'Not found'});
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('_system/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('_system/error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
