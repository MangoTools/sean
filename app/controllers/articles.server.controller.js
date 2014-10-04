'use strict';

/**
 * Module dependencies.
 */
var db = require('../../config/sequelize'),
    errorHandler = require('./errors');

/**
* Create a article
*/
exports.create = function(req, res) {
	var article = req.body;

	article.UserId = req.user.id;

    db.Article.create(req.body).done(function(err, article){
        if(err){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        return res.jsonp(article);
    });
};

/**
* Show the current article
*/
exports.read = function(req, res) {
	res.jsonp(req.article);
};

/**
* Update a article
*/
exports.update = function(req, res) {

	var article = req.article;

	article = _.extend(article, req.body);

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(article);
		}
	});
};

/**
* Delete an article
*/
exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(article);
		}
	});
};

/**
* List of Articles
*/
exports.list = function(req, res) {
    db.Article.findAll({ include: [{ model: db.User, attributes: ['displayName'] }], order: 'created' }).done(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(articles);
		}
	});
};

/**
* Article middleware
*/
exports.articleByID = function(req, res, next, id) {
    db.Article.find({where: { id: id }, include: [ { model: db.User, attributes: ['displayName'] } ] }).done(function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('Failed to load article ' + id));
		req.article = article;
		next();
	});
};

/**
* Article authorization middleware
*/
exports.hasAuthorization = function(req, res, next) {
	if (req.article.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
