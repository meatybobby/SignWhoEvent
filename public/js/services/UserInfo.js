app.factory('UserInfo', function($http) {    
	console.log("Enter UserInfo");
	return $http.get('/api/user')
    .success(function(data) {
           return data;
    })
    .error(function(data) {
           console.log(data);
           return data;
    });

     
}); 
