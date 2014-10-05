'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	app: {
		title: 'SEAN',
		description: 'Full-Stack JavaScript with SQL Express, AngularJS, and Node.js',
		keywords: 'SQL, express, angularjs, node.js, sequelize, passport'
	},
    root: rootPath,
	port: process.env.PORT || 3000,
    modelsDir : rootPath + '/app/models',
	templateEngine: 'swig',
	sessionSecret: 'SEAN - Need to be Changed',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/angularjs-toaster/toaster.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/angularjs-toaster/toaster.js',
                'public/lib/angular-socket-io/socket.js',
                'public/lib/socket.io-client/socket.io.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
            'public/roleManager.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
