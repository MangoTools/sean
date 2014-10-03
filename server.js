'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    Sequelize = require('sequelize');


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
console.log('SEAN application started on port ' + config.port);






