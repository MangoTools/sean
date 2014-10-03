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
    };
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
    if( (this.provider !== 'local' || (password && password.length > 6)) === false ){
        throw new Error('Local strategy failed');
    };
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
        displayName: {
            type: DataTypes.STRING
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
            type: DataTypes.NUMBER
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
            //makeSalt: function() {
            //    return crypto.randomBytes(16).toString('base64');
            //},
            //authenticate: function(plainText){
            //    return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
            //},
            //encryptPassword: function(password, salt) {
            //    if (!password || !salt) return '';
            //    salt = new Buffer(salt, 'base64');
            //    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
            //}
        },
        associate: function(models) {
            User.hasMany(models.Article);
        }
    });
    return User;
};
//
///**
//* Hook a pre save method to hash the password
//*/
//UserSchema.pre('save', function(next) {
//	if (this.password && this.password.length > 6) {
//		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
//		this.password = this.hashPassword(this.password);
//	}
//
//	next();
//});
//
///**
//* Create instance method for hashing a password
//*/
//UserSchema.methods.hashPassword = function(password) {
//	if (this.salt && password) {
//		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
//	} else {
//		return password;
//	}
//};
//
///**
//* Create instance method for authenticating user
//*/
//UserSchema.methods.authenticate = function(password) {
//	return this.password === this.hashPassword(password);
//};
//
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
