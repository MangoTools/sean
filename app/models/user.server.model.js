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
        throw new Error('Local strategy failed');
    }
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
            validate: { isValid: validateLocalStrategyProperty, msg: 'Please fill in your first name'}
        },
        lastName: {
            type: DataTypes.STRING,
            defaultValue: '',
            validate: { isValid: validateLocalStrategyProperty, msg: 'Please fill in your last name'}
        },
        email: {
            type: DataTypes.STRING,
            defaultValue: '',
            validate: { isEmail: { msg: 'Please fill a valid email address}' },
                        isValid: validateLocalStrategyProperty, msg: 'Please fill in your email'}
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: { notNull: { msg: 'Please fill in a username' } }
        },
        password: {
            type: DataTypes.STRING,
            default: '',
            validate: { isValid: validateLocalStrategyPassword, msg: 'Password should be longer'}
        },
        salt: {
            type: DataTypes.STRING
        },
        provider: {
            type: DataTypes.STRING,
            validate: { notNull: { msg: 'Provider is required' } }
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
            makeSalt: function() {
                new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
            },
            authenticate: function(password){
                return this.password === this.hashPassword(password);
            },
            hashPassword: function(password,salt) {
                if (salt && password) {
                    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
                } else {
                    return password;
                }
            }
        },
        associate: function(models) {
            User.hasMany(models.Article);
        }
    });
    return User;
};



///**
//* Find possible not used username
//*/
//UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
//	var _this = this;
//	var possibleUsername = username + (suffix || '');
//
//	_this.findOne({
//		username: possibleUsername
//	}, function(err, user) {
//		if (!err) {
//			if (!user) {
//				callback(possibleUsername);
//			} else {
//				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
//			}
//		} else {
//			callback(null);
//		}
//	});
//};
