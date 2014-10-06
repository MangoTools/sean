'use strict';

/**
 * Module dependencies.
 */
var glob = require('glob'),
    loggerInit = require('./logger');

/**
 * Module init function.
 */
module.exports = function() {

	/**
	 * Before we begin, lets set the environment variable
	 * We'll Look for a valid NODE_ENV variable and if one cannot be found load the development NODE_ENV
	 */
	glob('./config/env/' + process.env.NODE_ENV + '.js', {
		sync: true
	}, function(err, environmentFiles) {
        var logger;
		if (!environmentFiles.length) {
            logger = loggerInit('development');
			if (process.env.NODE_ENV) {
                logger.error('No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead');
			} else {
                logger.warn('NODE_ENV is not defined! Using default development environment');
			}
			process.env.NODE_ENV = 'development';
		} else {
            logger = loggerInit(process.env.NODE_ENV);
            logger.info('Application loaded using the "' + process.env.NODE_ENV + '" environment configuration');
		}
        /**
         * Logger will be accessible everywhere
         */
        global.logger = logger;

    });

	/**
	 * Add our server node extensions
	 */
	require.extensions['.server.controller.js'] = require.extensions['.js'];
	require.extensions['.server.model.js'] = require.extensions['.js'];
	require.extensions['.server.routes.js'] = require.extensions['.js'];
    require.extensions['.server.service.js'] = require.extensions['.js'];
};
