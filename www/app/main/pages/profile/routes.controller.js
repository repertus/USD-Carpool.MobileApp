(function() {
  'use strict';

  angular
    .module('app')
    .controller('TripRouteController', TripRouteController);

  TripRouteController.$inject = ['tripRoutesFactory', '$q', 'toastr', '$scope'];

  /* @ngInject */
  function TripRouteController(tripRoutesFactory, $q, toastr, $scope) {
    var vm = this;

    //Properties
    vm.directionsService = new google.maps.DirectionsService;
    vm.directionsDisplay = new google.maps.DirectionsRenderer;
    var myLatlng = new google.maps.LatLng(32.771952, -117.188150);

    //Methods
    vm.calculateAndDisplayRoute = calculateAndDisplayRoute;

    activate();

    function activate() {

         //Renders the Google maps on the Route settings screen



      var mapOptions = {
        center: myLatlng,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      vm.directionsDisplay.setMap(map);

      vm.map = map;

      //Calls the carpool routes from the server through the factory
      tripRoutesFactory.getAllRoutes().then(
        function(data) {
          vm.routes = data.routes;
        }
      );

      //  google.maps.event.addDomListener(window, 'load', function() {
      //    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
      //
      //    var mapOptions = {
      //      center: myLatlng,
      //      zoom: 13,
      //      mapTypeId: google.maps.MapTypeId.ROADMAP
      //    };
      //
      //    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      //
      //    navigator.geolocation.getCurrentPosition(function(pos) {
      //      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      //      var myLocation = new google.maps.Marker({
      //        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
      //        map: map,
      //        title: "My Location"
      //      });
      //    });
      //
      //    $scope.map = map;
      //  });
    }

    function calculateAndDisplayRoute(route, directionsService, directionsDisplay)
    {
         directionsService.route({
          origin: {lat: route.routeStartLat, lng: route.routeStartLong},
          destination: {lat: route.routeEndLat, lng: route.routeEndLong},
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    }
  }
})();
