'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    Sequelize = require('sequelize'),
    winston = require('winston');

// Logging initialization
logger.info('SEAN application starting...');
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection using Sequelize

require('./config/sequelize');

// Init the express application
var app = require('./config/express')();

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;



// Logging initialization
logger.info('SEAN application started on port ' + config.port);






