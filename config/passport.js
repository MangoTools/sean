'use strict';

var passport = require('passport'),
	//User = require('mongoose').model('User'),
	path = require('path'),
	config = require('./config'),
    db = require('./sequelize');

module.exports = function() {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		db.User.find({where :{id: id}})
            .success(function(user){
                delete user.salt;
                delete user.password;
                done(null,user);
            }).error(function(err){
                done(err,null);
            });
	});

	// Initialize strategies
	config.getGlobbedFiles('./config/strategies/**/*.js').forEach(function(strategy) {
		require(path.resolve(strategy))();
	});
};
