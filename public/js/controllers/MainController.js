app.controller('MainController', ['$rootScope', '$http', 'LoggedInCheck', 'UserInfo', function($rootScope, $http, LoggedInCheck, UserInfo) {
   // console.log("Hello World from controller");

LoggedInCheck.success(function(data) {
    $rootScope.loggedIn = data=='true'? true : false;
    console.log("$rootScope.loggedIn: " + $rootScope.loggedIn);
});

/*
  UserInfo will be instantiated anyway when it's in app.controller(,[])
*/
UserInfo.success(function(data) {
    $rootScope.user = data;
});


}]);﻿











