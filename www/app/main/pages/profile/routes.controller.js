(function() {
  'use strict';

  angular
    .module('app')
    .controller('TripRouteController', TripRouteController);

  TripRouteController.$inject = ['tripRoutesFactory', 'sharedDataFactory', '$q', 'toastr', '$scope', '$ionicModal', '$stateParams'];

  /* @ngInject */
  function TripRouteController(tripRoutesFactory, sharedDataFactory, $q, toastr, $scope, $ionicModal, $stateParams) {
    var vm = this;

    //Properties
    vm.directionsService = new google.maps.DirectionsService;
    vm.directionsDisplay = new google.maps.DirectionsRenderer;
    var myLatlng = new google.maps.LatLng(32.771952, -117.188150);

    //Methods
    vm.calculateAndDisplayRoute = calculateAndDisplayRoute;
    vm.profileId = $stateParams.profileId;

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
    }

    //Displays the routes on the Google Maps screen
    function calculateAndDisplayRoute(route, directionsService, directionsDisplay) {
      directionsService.route({
        origin: {
          lat: route.routeStartLat,
          lng: route.routeStartLong
        },
        destination: {
          lat: route.routeEndLat,
          lng: route.routeEndLong
        },
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    $ionicModal.fromTemplateUrl('origination-route.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });


    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    //Pulls the profile data from the home tab
    $scope.$on('$ionicView.enter', function() {
      vm.profile = sharedDataFactory.getProfile();
      var driver = vm.profile.driver;
      var originationId = driver[0].originationId;

      tripRoutesFactory.getByRouteId(originationId).then(
           function (originationRoute) {
                vm.originationRoute = originationRoute.route;
           }
      );
    });

  }
})();
