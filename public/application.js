'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
	}
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(['Message','Authentication','Authorization','$rootScope','$state',
    function(Message,Authentication,Authorization,$rootScope,$state){


        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if(!('data' in toState) || !('access' in toState.data)){

                event.preventDefault();
                Message.error('Routing Error','Access undefined for this state');
            }
            else if (!Authorization.authorize(toState.data.access)) {
                Message.error('Access Restricted', 'Seems like you tried accessing a route you don\'t have access to...');
                event.preventDefault();
                if(Authentication.user.role.title ==='public')  $state.go('signIn');
            }
        });
    }
]);



//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
