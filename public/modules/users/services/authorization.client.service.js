'use strict';

angular.module('users').factory('Authorization', ['Authentication',
	function(Authentication) {
        var accessLevels = roleManager.accessLevels
            , userRoles = roleManager.userRoles;

		return {
            authorize: function(accessLevel, role) {
                if(role === undefined) {
                    role = angular.copy(Authentication.user.roleBitMask);
                }
                return accessLevel.bitMask & role;
            },
            accessLevels: accessLevels,
            userRoles: userRoles
		};
	}
]);
