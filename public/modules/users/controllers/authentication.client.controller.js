'use strict';

angular.module('users').controller('AuthenticationController', ['$scope','$rootScope', '$http', '$location', 'Authentication','Storage','Message',
	function($scope,$rootScope, $http, $location, Authentication,Storage,Message) {

		// If user is signed in then redirect back home
		if (Authentication.isAuthenticated()) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
                Storage.set('auth_token',response);
                $rootScope.$broadcast('Auth');
                Message.success('Login','Welcome '+ response.user.displayName);
				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
                Message.error('Failed to register',response.message);
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
                Storage.set('auth_token',response);
                $rootScope.$broadcast('Auth');
                Message.success('Login','Welcome '+ response.user.displayName);
				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
                Message.error('Failed to login',response.message);
			});
		};

	}
]);
