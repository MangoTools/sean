'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    db = require('../../../config/sequelize');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {

	db.User.find({where : { id: id }}).success(function(user){
        if (!user) return next(new Error('Failed to load User ' + id));
        req.profile = user;
        next();
    }).error(function(err){
        next(err);
    });
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

    return function(req, res, next) {
        _this.requiresLogin(req, res, function() {
            if (req.user.role.title === role.title && req.user.role.bitMask === role.bitMask) {
                return next();
            } else {
                return res.status(403).send({
                    message: 'User is not authorized'
                });
            }
        });
    };
};
