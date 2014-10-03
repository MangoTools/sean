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

var db = new Sequelize(config.db.dbName, config.db.username, config.db.password, {
    dialect: config.db.dialect,
    port:   config.db.port
});

db.authenticate().complete(function(err) {
    if (!!err) {
        console.log('Unable to connect to the database:', err)
    } else {
        console.log('Database connection has been established successfully.')
    }
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('SEAN application started on port ' + config.port);






