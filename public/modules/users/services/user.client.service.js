'use strict';

/**
 * @ngdoc service
 * @name boatDatingApp.User
 * @description
 * # User
 * Service in the boatDatingApp.
 */
angular.module('core').service('User', ['Storage', function User(Storage) {
        return{
            /**
             * Return  the current user stored in local Storage
             *
             * @returns {{}}
             */
            get: function() {
                return Storage.get('auth_token') ? Storage.get('auth_token').user : {}
            }
        };
    }]);
