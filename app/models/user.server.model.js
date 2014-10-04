'use strict';

/**
 * Module dependencies.
 */
var crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
    if( ((this.provider !== 'local' && !this.updated) || property.length) === false ){
        throw new Error('Local strategy failed');
    }
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
    if( (this.provider !== 'local' || (password && password.length > 6)) === false ){
        throw new Error('One field is missing');
    }
};

/**
 * hash the password
 * @param user
 * @param fn
 */
var cryptPassword =function(user, fn) {
    if (user.password && user.password.length > 6) {
        user.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        user.password = user.hashPassword(user.password);
        console.log( user.salt);
        console.log( user.password);
    }
    fn(null, user);
};

/**
 * Article Schema
 */
module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('User', {
            created: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updated: {
                type: DataTypes.DATE
            },
            firstName: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: { isValid: validateLocalStrategyProperty}
            },
            lastName: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: { isValid: validateLocalStrategyProperty}
            },
            email: {
                type: DataTypes.STRING,
                defaultValue: '',
                validate: { isEmail: { msg: 'Please fill a valid email address}' },
                    isValid: validateLocalStrategyProperty}
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                default: '',
                validate: { isValid: validateLocalStrategyPassword}
            },
            salt: {
                type: DataTypes.BLOB('tiny')
            },
            provider: {
                type: DataTypes.STRING,
                allowNull: false
            },
            providerData: {
                type: DataTypes.TEXT
            },
            additionalProvidersData: {
                type: DataTypes.TEXT
            },
            roleTitle: {
                type: DataTypes.STRING
            },
            roleBitMask: {
                type: DataTypes.INTEGER
            },
            resetPasswordToken: {
                type: DataTypes.STRING
            },
            resetPasswordExpires: {
                type: DataTypes.DATE
            }

        },
        {
            instanceMethods: {
                getDisplayName: function() {
                    return [this.firstName, this.lastName].join(' ');
                },
                authenticate: function(password){
                    return this.password === this.hashPassword(password);
                },
                hashPassword: function(password) {
                    if (this.salt && password) {
                        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
                    } else {
                        return password;
                    }
                }
            },
            classMethods: {
                findUniqueUsername : function(username, suffix, callback) {
                    var _this = this;
                    var possibleUsername = username + (suffix || '');

                    _this.findOne({
                        username: possibleUsername
                    }, function (err, user) {
                        if (!err) {
                            if (!user) {
                                callback(possibleUsername);
                            } else {
                                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                            }
                        } else {
                            callback(null);
                        }
                    });
                }
            },
            associate: function(models) {
                User.hasMany(models.Article);
            },
            hooks: {
                beforeCreate: cryptPassword,
                beforeUpdate: cryptPassword
                }

        });
    return User;
};
