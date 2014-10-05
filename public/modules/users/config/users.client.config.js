'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication','Message',
			function($q, $location, Authentication,Message) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;
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
