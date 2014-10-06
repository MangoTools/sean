'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors'),
    passport = require('passport'),
    config = require('../../../config/config'),
    nodemailer = require('nodemailer'),
    db = require('../../../config/sequelize'),
    tokenService = require('../../services/token'),
    async = require('async'),
    crypto = require('crypto');

/**
 * Forgot for reset password (forgot POST)
 */
exports.forgot = function(req, res, next) {
    async.waterfall([
        // Generate random token
        function(done) {
            crypto.randomBytes(20, function(err, buffer) {
                var token = buffer.toString('hex');
                done(err, token);
            });
        },
        // Lookup user by username
        function(token, done) {
            if (req.body.username) {

                db.User.find({where : {
                    username: req.body.username }
                }).done(function(err,user){
                    if (!user) {
                        return res.status(400).send({
                            message: 'No account with that username has been found'
                        });
                    } else if (user.provider !== 'local') {
                        return res.status(400).send({
                            message: 'It seems like you signed up using your ' + user.provider + ' account'
                        });
                    } else {
                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                        user.save().done(function(err) {
                            done(err, token, user);
                        });
                    }
                });

            } else {
                return res.status(400).send({
                    message: 'Username field must not be blank'
                });
            }
        },
        function(token, user, done) {
            res.render('templates/reset-password-email', {
                name: user.displayName,
                appName: config.app.title,
                url: 'http://' + req.headers.host + '/auth/reset/' + token
            }, function(err, emailHTML) {
                done(err, emailHTML, user);
            });
        },
        // If valid email, send reset email using service
        function(emailHTML, user, done) {
            var smtpTransport = nodemailer.createTransport(config.mailer.options);
            var mailOptions = {
                to: user.email,
                from: config.mailer.from,
                subject: 'Password Reset',
                html: emailHTML
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                if (!err) {
                    res.send({
                        message: 'An email has been sent to ' + user.email + ' with further instructions.'
                    });
                }

                done(err);
            });
        }
    ], function(err) {
        if (err) return next(err);
    });
};

/**
 * Reset password GET from email token
 */
exports.validateResetToken = function(req, res) {
    db.User.find({ where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires : {gt :Date.now()
        }}
    }).done(function(err,user) {
        if (!user) {
            return res.redirect('/password/reset/invalid');
        }
        res.redirect('/password/reset/' + req.params.token);
    });
};

/**
 * Reset password POST from email token
 */
exports.reset = function(req, res, next) {
    // Init Variables
    var passwordDetails = req.body;

    async.waterfall([
        function(done) {
            User.find({ where: {
                resetPasswordToken: req.params.token,
                resetPasswordExpires : {gt :Date.now()
                }}
            }).done(function(err,user) {
                if (!err && user) {
                    if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                        user.password = passwordDetails.newPassword;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save().done(function(err) {
                            if (err) {
                                return res.status(400).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            } else {
                                req.login(user, function(err) {
                                    if (err) {
                                        res.status(400).send(err);
                                    } else {
                                        // Return authenticated user
                                        res.jsonp({user: user, token: tokenService.issueToken(user)});

                                        done(err, user);
                                    }
                                });
                            }
                        });
                    } else {
                        return res.status(400).send({
                            message: 'Passwords do not match'
                        });
                    }
                } else {
                    return res.status(400).send({
                        message: 'Password reset token is invalid or has expired.'
                    });
                }
            });
        },
        function(user, done) {
            res.render('templates/reset-password-confirm-email', {
                name: user.displayName,
                appName: config.app.title
            }, function(err, emailHTML) {
                done(err, emailHTML, user);
            });
        },
        // If valid email, send reset email using service
        function(emailHTML, user, done) {
            var smtpTransport = nodemailer.createTransport(config.mailer.options);
            var mailOptions = {
                to: user.email,
                from: config.mailer.from,
                subject: 'Your password has been changed',
                html: emailHTML
            };

            smtpTransport.sendMail(mailOptions, function(err) {
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
    });
};

/**
 * Change Password
 */
exports.changePassword = function(req, res, next) {
    // Init Variables
    var passwordDetails = req.body;


    if (req.user) {
        if (passwordDetails.newPassword) {
            db.User.find({ where : { id :req.user.id}})
                .done(function(err,user) {
                    if (!err && user) {
                        if (user.authenticate(passwordDetails.currentPassword)) {
                            if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
                                user.password = user.hashPassword(passwordDetails.newPassword);
                                user.save().done(function(err) {
                                    if (err) {
                                        return res.status(400).send({
                                            message: errorHandler.getErrorMessage(err)
                                        });
                                    } else {
                                        req.login(user, function(err) {
                                            if (err) {
                                                res.status(400).send(err);
                                            } else {
                                                res.send({
                                                    message: 'Password changed successfully'
                                                });
                                            }
                                        });
                                    }
                                });
                            } else {
                                res.status(400).send({
                                    message: 'Passwords do not match'
                                });
                            }
                        } else {
                            res.status(400).send({
                                message: 'Current password is incorrect'
                            });
                        }
                    } else {
                        res.status(400).send({
                            message: 'User is not found'
                        });
                    }
                });
        } else {
            res.status(400).send({
                message: 'Please provide a new password'
            });
        }
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};
