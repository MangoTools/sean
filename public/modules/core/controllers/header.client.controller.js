'use strict';

angular.module('core').controller('HeaderController', ['$scope','$rootScope','$http', 'User', 'Menus','Authentication','Storage','Message','$location',
	function($scope,$rootScope,$http, User, Menus,Authentication,Storage,Message,$location) {
		$scope.user = User.get();
        $scope.isAuthenticated = Authentication.isAuthenticated();
        $rootScope.$on('Auth',function(){
            $scope.user = User.get();
            $scope.isAuthenticated = Authentication.isAuthenticated();
        });
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

        $scope.signOut = function() {
            $http.get('/auth/signout').success(function() {

            });

            Storage.unset('auth_token');
            $rootScope.$broadcast('Auth');
            Message.success('LogOut','Good Bye ');
            // And redirect to the index page
            $location.path('/');

        };
	}
]);
