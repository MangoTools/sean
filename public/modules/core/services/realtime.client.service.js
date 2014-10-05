'use strict';

angular.module('core').factory('RealTime', ['socketFactory',
	function(socketFactory) {
        return socketFactory();
	}
]);
