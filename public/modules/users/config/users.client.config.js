'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication','Message','Storage',
			function($q, $location, Authentication,Message,Storage) {
				return {
                    request: function(config) {
                        var token;

                        if (Storage.get('auth_token')) {
                            token = angular.fromJson(Storage.get('auth_token')).token;
                        }

                        // Yeah we have a token
                        if (token) {
                            if (!config.data) {
                                config.data = {};
                            }

                            /**
                             * Set token to actual data and headers. Note that we need bot ways because of
                             * socket cannot modify headers anyway. These values are cleaned up in backend
                             * side policy (middleware).
                             */
                            config.data.token = token;
                            config.headers.Authorization = 'Bearer ' + token;
                        }

                        return config;
                    },
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
                                Storage.unset('auth_token');
                                Message.error('Authentication','You are not authenticated');
								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
                                Message.error('Authorization','You are not authorized to perform this action');
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
