var app = angular.module('SignWhoApp', ['ngRoute']);

app.config(function($routeProvider) {
  
  $routeProvider
	.when('/',{
		templateUrl: 'views/events.html',
		controller: 'EventController'
	})
	.when('/new',{
		templateUrl: 'views/new-event.html',
		controller: 'EventController'
	})
	.when('/edit/:event_id',{
		templateUrl: 'views/update-event.html',
		controller: 'EventDetailController'
	})
	.when('/event/:event_id',{
		templateUrl: 'views/view-event.html',
		controller: 'EventDetailController'
	})
	.when('/profile', {
		resolve: {
			"check": function($location, $rootScope) {
				if ($rootScope.loggedIn != true) {
					$location.path('/');
				}
			}
		},
		templateUrl: 'views/profile.html',
    controller: 'ProfileController'
	})
	.otherwise({
		redirectTo: '/'
	});
	
	
});



























