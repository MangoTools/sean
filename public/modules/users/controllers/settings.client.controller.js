'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$rootScope', '$http', '$location', 'Users', 'Authentication','User','Message','Storage',
	function($scope, $rootScope, $http, $location, Users, Authentication,User,Message,Storage) {
		$scope.user = User.get();

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('api/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
                Storage.set('auth_token',response);
                $rootScope.$broadcast('Auth');
                Message.success('Remove Social Account','Successfully removed social provider.');
			}).error(function(response) {
                Message.error('Failed to Remove Social Account',response.message);
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid){
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
	
				user.$update(function(response) {
					$scope.success = true;
                    Storage.set('auth_token',response);
                    $rootScope.$broadcast('Auth');
                    Message.success('Update Profile','Successfully updated your profile.');
				}, function(response) {
                    Message.error('Failed to Update Profile',response.message);
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('api/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
                Message.success('Change Password','Successfully changed  your password.');
			}).error(function(response) {
                Message.error('Failed to change password',response.message);
			});
		};
	}
]);
