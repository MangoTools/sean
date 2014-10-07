'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    db = require('../../config/sequelize');

/**
 * Globals
 */
var user, user2;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		user = db.User.build({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});
		user2 = db.User.build({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {

			db.User.findAll().done(function(err, users) {
                users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			user.save().done(done);
		});

		it('should fail to save an existing user again', function(done) {
			user.save().done(function(err, user){
                user2.save().done(function(err) {
                    should.exist(err);
                    done();
                });
            });

		});

		it('should be able to show an error when try to save without first name', function(done) {
			user.firstName = '';
			return user.save().done(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	after(function(done) {
		db.User.destroy().done(function(err){/*console.log(err);*/});
		done();
	});
});
