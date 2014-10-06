'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    tokenService = require('../../services/token'),
    roleManager = require('../../../config/roleManager'),
    db = require('../../../config/sequelize');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {

    db.User.find({where : { id: id }}).done(function(err,user){
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        req.profile = user;
        next();
    });
};

/**
 * Require login routing middleware
 */
exports.isAuthenticated = function(req, res, next) {
    var token;

    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');

        if (parts.length == 2) {
            var scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.json(401, {message: 'Format is Authorization: Bearer [token]'});
        }
    } else if (req.param('token')) {
        token = req.param('token');

        // We delete the token from query and body to not mess with blueprints
        delete req.query.token;
        delete req.body.token;
    } else {
        return res.json(401, {message: 'No Authorization header was found'});
    }

    tokenService.verifyToken(token, function(error, token) {
        if (error) {
            return res.json(401, {message: 'User is not logged in'});
        } else {
            req.token = token;

            return next();
        }
    });
};

/**
 * User authorizations routing middleware
 */
exports.isAuthorized = function(accessLevel) {
    var _this = this;

    return function(req, res, next) {
        _this.isAuthenticated(req, res, function() {
            if(roleManager.accessLevels[accessLevel].bitMask & req.user.roleBitMask){
                next()
            }else{
                return res.status(403).send({
                    message: 'User is not authorized'
                });
            }
        });
    };
};
