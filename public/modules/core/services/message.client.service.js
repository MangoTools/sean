'use strict';

angular.module('core').factory('Message', ['toaster',
	function(toaster) {

        function send(type,title,message){
            toaster.pop(type,title,message);
        }
		return {
			success: function(title,message) {
                send('success',title,message);
			},
            error : function(title,message){
                send('error',title,message);
            },
            warning : function(title,message){
                send('warning',title,message);
            },
            note : function(title,message){
                send('note',title,message);
            }
		};
	}
]);
