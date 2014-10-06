'use strict';

angular.module('core').factory('Storage', ['localStorageService',
    function(localStorageService){


        return {
            /**
             * Get method for LocalStorageModule requests. Main purpose of this method is to get stored data form local storage
             * to every request that application does.
             *
             * @param   {string} key
             *
             * @returns {string}
             */
            get: function (key) {
                return localStorageService.get(key);
            },
            /**
             * Set method for LocalStorageModule requests. Main purpose of this method is to store data into local storage
             * for every request that application does.
             *
             * @param   {string} key
             * @param   {string} val
             *
             * @returns {*}
             */
            set: function (key, val) {
                return localStorageService.set(key, val);
            },
            /**
             * unset method for LocalStorageModule requests. Main purpose of this method is to remove data into local storage
             * for every request that application does.
             *
             * @param   {string} key
             *
             * @returns {*}
             */

            unset: function (key) {
                return localStorageService.remove(key);
            }
        }
    }]);
