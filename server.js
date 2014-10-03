'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    Sequelize = require('sequelize'),
    winston = require('winston');

/**
 * Can use logger anywhere in the application
 */
var loggerTransports = [];

if (process.env.NODE_ENV === 'development') {
    loggerTransports.push(
        new winston.transports.File({
            level: 'info',
            filename: './logs/logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        }));
}else if (process.env.NODE_ENV === 'production') {
    loggerTransports.push(
        new winston.transports.File({
            level: 'error',
            filename: './logs/logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'error',
            handleExceptions: true,
            json: false,
            colorize: true
        }));
}

global.logger = new (winston.Logger)({
    transports: loggerTransports
});
// Logging initialization
logger.info('SEAN application starting...');
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection using Sequelize

require('./config/sequelize');

// Init the express application
var app = require('./config/express');

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
module.exports = app;



// Logging initialization
logger.info('SEAN application started on port ' + config.port);






