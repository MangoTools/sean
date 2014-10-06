'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	articles = require('../../app/controllers/articles');

module.exports = function(app) {
	// Article Routes
	app.route('/api/articles')
		.get(users.isAuthorized('user'),articles.list)
		.post(users.isAuthenticated, articles.create);

	app.route('/api/articles/:articleId')
		.get(articles.read)
		.put(users.isAuthenticated, articles.isOwner, articles.update)
		.delete(users.isAuthenticated, articles.isOwner, articles.delete);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};
