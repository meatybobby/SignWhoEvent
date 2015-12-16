app.controller('EventController', ['$scope','$rootScope' ,'$http','$location', function($scope, $rootScope, $http, $location) {
   // console.log("Hello World from controller");

var refresh = function() {
  $http.get('api/events').success(function(response) {
   // console.log("I got the data I requested");
    $scope.events = response;
    $scope.event = "";
  });
};

refresh();

$scope.addEvent = function() {
  var newEvent = {};
  angular.copy($scope.event, newEvent);
  /* Convert the date string into timestamp format */
  newEvent.date = Date.parse($scope.event.date);
  if(!isNaN(newEvent.date)) {
    $http.post('/api/events', newEvent).success(function(response) {
        refresh();
        $location.path('/');
      });  
  }
  else alert('Wrong date format!');
  
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/api/event/' + id).success(function(response) {
      refresh();
      jQuery('#modal-'+id).closeModal();
  });
};

$scope.openEvent = function(id) {
  jQuery('#modal-'+id).openModal();
}

/*$scope.deselect = function() {
  $scope.event = "";
  //$scope.event.content = "haha";
}*/


$scope.edit = function(id) {
  console.log("edit "+id);
  jQuery('#modal-'+id).closeModal();
  $location.path('/edit/'+id);
};


}]);﻿

/* Controller for view-event page */
app.controller('EventDetailController', ['$scope','$rootScope', '$routeParams','$http','$location', '$filter',
  function($scope, $rootScope, $routeParams, $http, $location, $filter) {

$http.get('api/event/'+ $routeParams.event_id).success(function(response) {
   // console.log("I got the data I requested");
  $scope.event = response;
  $scope.event.date = $filter("date")($scope.event.date, "yyyy-MM-dd");

  setTimeout(function(){
    $('#textarea1').trigger('autoresize');
    $('#textarea1').trigger('change');
    $('#event_title').trigger('change');
    $('#event_date').trigger('change');
  }, 10);
  
});

$scope.remove = function(id) {
 // console.log(id);
  $http.delete('/api/event/' + id).success(function(response) {
    $location.path('/');
  });
};

/*
$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};*/

  
}]);









