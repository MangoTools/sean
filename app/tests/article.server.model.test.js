'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    db = require('../../config/sequelize');

/**
 * Globals
 */
var user, article;

/**
 * Unit tests
 */
describe('Article Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = db.User.build({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save().done(function(err, user) {
			article = db.Article.build({
				title: 'Article Title',
				content: 'Article Content',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return article.save().done(function(err, article) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without title', function(done) {
			article.title = '';

			return article.save().done(function(err, article) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		db.Article.destroy().done();
		db.User.destroy().done();
		done();
	});
});
