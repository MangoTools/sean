'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$rootScope','Storage',
    function($rootScope,Storage){

        var currentUser = Storage.get('auth_token') !== null ? Storage.get('auth_token').user : { username: '', roleBitMask: roleManager.userRoles.public.bitMask , roleTitle: roleManager.userRoles.public.title};

        $rootScope.$on('Auth',function(){
            currentUser = Storage.get('auth_token') !== null ? Storage.get('auth_token').user : { username: '', roleBitMask: roleManager.userRoles.public.bitMask , roleTitle: roleManager.userRoles.public.title};
        });

        var accessLevels = roleManager.accessLevels
            , userRoles = roleManager.userRoles;

        return {
            authorize: function(accessLevel, role) {
                if(role === undefined) {

                    role = angular.copy(currentUser.roleBitMask);
                }
                return accessLevel.bitMask & role;
            },
            isAuthenticated : function() {
                return Storage.get('auth_token');
            },
            accessLevels: accessLevels,
            userRoles: userRoles

        }

    }
]);

