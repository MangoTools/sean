'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
    expressJwt = require('express-jwt'), //https://npmjs.org/package/express-jwt
	compress = require('compression'),
	methodOverride = require('method-override'),
	helmet = require('helmet'),
	passport = require('passport'),
    db = require('./sequelize'),
	flash = require('connect-flash'),
	config = require('./config'),
	consolidate = require('consolidate'),
	path = require('path');

//// initialize session store
//var SequelizeStore = require('connect-sequelize')(session),
//    modelName = 'Session',
//    options = {};



module.exports = function() {
    // Initialize express app
    var app = express();
    var server = http.createServer(app);
    var io = socketio.listen(server);

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	app.locals.facebookAppId = config.facebook.clientID;
	app.locals.jsFiles = config.getJavaScriptAssets();
	app.locals.cssFiles = config.getCSSAssets();

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Showing stack errors
	app.set('showStackError', true);

	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');

    // Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Enable express logger routing
        logger.debug("Overriding 'Express' logger");
        app.use(require('morgan')("default", { "stream": logger.stream }));

		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

    app.use('/api', expressJwt({secret: config.secret}));

    // Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Enable jsonp
	app.enable('jsonp callback');

	// CookieParser should be above session
	//app.use(cookieParser());

	// Express SQL session storage


	//app.use(session({
	//	saveUninitialized: true,
	//	resave: true,
	//	secret: config.sessionSecret,
     //   store: new SequelizeStore(db.sequelize, options, modelName),
     //   proxy: false // if you do SSL outside of node.
	//}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// connect flash for flash messages
	app.use(flash());

	// Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));

    // Globbing routing files
    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
        if(routePath != './app/routes/core.server.routes.js'){
            require(path.resolve(routePath))(app);
        }

    });
    require(path.resolve('./app/routes/core.server.routes.js'))(app);

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).render('500', {
			error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});

    app.set('socketio', io);
    app.set('server', server);

	return app;
};
