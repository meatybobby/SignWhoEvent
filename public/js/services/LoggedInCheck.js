app.factory('LoggedInCheck', function($http) {    
	//console.log("Enter LoggedInCheck");

     return $http.get('/loggedIn')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}); 




























