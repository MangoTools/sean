var fs        = require('fs');
var path      = require('path');
var Sequelize = require('Sequelize');
var _         = require('lodash');
var config    = require('./config');
var db        = {};

var sequelize = new Sequelize(config.db.dbName, config.db.username, config.db.password, {
    dialect: config.db.dialect,
    port:   config.db.port,
    logging : false

});

sequelize.authenticate().complete(function(err) {
    if (!!err) {
       logger.error('Unable to connect to the database:', err)
    } else {
        logger.info('Database connection has been established successfully.')
    }
});

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(config.modelsDir)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'session.server.model.js');
    })
    // import model files and save model names
    .forEach(function(file) {
        logger.debug('Loading model file ' + file);
        var model = sequelize.import(path.join(config.modelsDir, file));
        db[model.name] = model;
    })

// invoke associations on each of the models
Object.keys(db).forEach(function(modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db)
    }
});

// Synchronizing any model changes with database.
// WARNING: this will DROP your database everytime you re-run your application
sequelize
    .sync({force: false})
    .complete(function(err){
        if(err)  logger.error("An error occured %j",err);
        else  logger.info("Database synchronized");
    });

// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);
