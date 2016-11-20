(function() {
  'use strict';

  angular
    .module('app')
    .controller('TripPickupController', TripPickupController);

  TripPickupController.$inject = ['tripRoutesFactory', 'sharedDataFactory', 'profileFactory', '$q', 'toastr', '$scope', '$ionicModal', '$ionicFilterBar', '$stateParams'];

  /* @ngInject */
  function TripPickupController(tripRoutesFactory, sharedDataFactory, profileFactory, $q, toastr, $scope, $ionicModal, $ionicFilterBar, $stateParams) {
    var vm = this;

    //Properties
    var filterBarInstance;
    var i = 0;
    var marker = null;
    var myLatlng = new google.maps.LatLng(32.771952, -117.188150);
    var originationPickups = [];
    var passenger = [];
    var passengerOriginationRoute = [];
    var passengerOriginationPoint = {};
    var passengerReturnRoute = [];
    var passengerReturnPoint = {};
    var returnPickups = [];
    var wayptsOrigination = [];
    var wayptsReturn = [];

    //Methods
    vm.activeRoute = activeRoute;
    vm.calculateAndDisplayRoute = calculateAndDisplayRoute;
    vm.closeModal = closeModal;
    vm.directionsService = new google.maps.DirectionsService;
    vm.directionsDisplay = new google.maps.DirectionsRenderer;
    vm.openModal = openModal;
    vm.profileId = $stateParams.profileId;
    vm.showFilterBar = showFilterBar;


    /////////////////////////////////////////////////////////////////

    //Sets the user driver route per selection and insures only one route is active
    function activeRoute(route) {
      var index = vm.routes.indexOf(route);

      for (i = 0; i < vm.routes.length; i++) {
        if (i != index && route.originationTrip == vm.status) {
          vm.routes[i].myStartRoute = false;
        };
      };

      if (route.originationTrip == true) {
        vm.profile.driver[0].originationId = route._id;
        var routeStatusUpdate = {
          '_id': vm.profileId,
          'driver': vm.profile.driver
        };
      } else {
        vm.profile.driver[0].returnId = route._id;
        var routeStatusUpdate = {
          '_id': vm.profileId,
          'driver': vm.profile.driver
        };
      }

      profileFactory.updateProfile(routeStatusUpdate).then();
    }

    //Displays the pickup points on the Google Maps screen
    function calculateAndDisplayRoute(route, waypts, directionsService, directionsDisplay) {
      directionsService.route({
        origin: {
          lat: route.routeStartLat,
          lng: route.routeStartLong
        },
        destination: {
          lat: route.routeEndLat,
          lng: route.routeEndLong
        },
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    // Closes the modal and resets the google map pickup points to null
    function closeModal() {
      $scope.oModal.hide();
      vm.directionsDisplay.setDirections({
        routes: []
      });
    };

    //Google map settings
    function googleMaps() {
      var mapOptions = {
        center: myLatlng,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      vm.directionsDisplay.setMap(map);
      vm.map = map;
    }

    //Opens the modal and calls google maps to render
    function openModal(index) {
      $scope.oModal.show();
      googleMaps();

      if (index == 1) {
        vm.pickups = originationPickups;
        vm.calculateAndDisplayRoute(vm.originationRoute, wayptsOrigination, vm.directionsService, vm.directionsDisplay);
        vm.directionsDisplay = new google.maps.DirectionsRenderer({
          suppressMarkers: true
        });
        marker = new google.maps.Marker({
          position: passengerOriginationPoint,
          map: vm.map,
          title: 'Hello World!'
        });
        var passengerPickupPoint = new google.maps.LatLng(passengerOriginationPoint.lat, passengerOriginationPoint.lng);
        vm.map.panTo(passengerPickupPoint);
      } else if (index == 2) {
        vm.pickups = returnPickups;
        vm.calculateAndDisplayRoute(vm.returnRoute, wayptsReturn, vm.directionsService, vm.directionsDisplay);
        marker = new google.maps.Marker({
          position: passengerReturnPoint,
          map: map,
          title: 'Hello World!'
        });
      }

      //Sets the modal toggle button positions per selected user passenger pickup points
      for (i = 0; i < vm.pickups.length; i++) {
        if (vm.pickups[i]._id == passenger[0].returnPickupId || vm.pickups[i]._id == passenger[0].originationPickupId) {
          vm.pickups[i].myStartRoute = true;
        } else {
          vm.pickups[i].myStartRoute = false;
        };
      };
    };

    //Filters pickup points through the search bar in the modal per user input
    function showFilterBar() {
      filterBarInstance = $ionicFilterBar.show({
        items: vm.pickups,
        update: function(filteredItems) {
          vm.pickups = filteredItems;
        },
        filterProperties: 'locationName'
      });
    };

    /////////////////////Ionic Functions///////////////////////////////////

    // Modal - Routes list
    $ionicModal.fromTemplateUrl('origination-route.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal = modal;
    });

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal.remove();
    });

    $scope.$on('$ionicView.beforeEnter', function() {
      //Calls the carpool routes from the server through the factory
      tripRoutesFactory.getAllRoutes().then(
        function(data) {
          vm.routes = data.routes;

          //Pulls the profile data from the home tab
          vm.profile = sharedDataFactory.getProfile();

          passenger = vm.profile.pickupPoint;
          vm.originationRouteId = passenger[0].originationRouteId;
          vm.returnRouteId = passenger[0].returnRouteId;

          //Pulls the origination pickup point per the user parameter
          tripRoutesFactory.getByRouteId(vm.originationRouteId).then(
            function(originationRoute) {
              vm.originationRoute = originationRoute.route;
              originationPickups = vm.originationRoute.pickupPoint;

              //Resets Origination waypoints
              wayptsOrigination = [];

              for (i = 0; i < vm.originationRoute.pickupPoint.length; i++) {
                if (vm.originationRoute.pickupPoint[i]._id == passenger[0].originationPickupId) {
                  vm.originationPickupName = vm.originationRoute.pickupPoint[i].locationName;
                  passengerOriginationPoint = {
                    'lat': vm.originationRoute.pickupPoint[i].pickupLat,
                    'lng': vm.originationRoute.pickupPoint[i].pickupLong
                  }
                };
                wayptsOrigination.push({
                  'location': {
                    lat: vm.originationRoute.pickupPoint[i].pickupLat,
                    lng: vm.originationRoute.pickupPoint[i].pickupLong
                  }
                });
              }
            });

          //Pulls the return pickup point per the user parameter
          tripRoutesFactory.getByRouteId(vm.returnRouteId).then(
            function(returnRoute) {
              vm.returnRoute = returnRoute.route;
              returnPickups = vm.returnRoute.pickupPoint;

              //Resets Return waypoints
              wayptsReturn = [];

              for (i = 0; i < vm.returnRoute.pickupPoint.length; i++) {
                if (vm.returnRoute.pickupPoint[i]._id == passenger[0].returnPickupId) {
                  vm.returnPickupName = vm.returnRoute.pickupPoint[i].locationName;
                  passengerReturnPoint = {
                    'lat': vm.returnRoute.pickupPoint[i].pickupLat,
                    'lng': vm.returnRoute.pickupPoint[i].pickupLong
                  }
                };
                wayptsReturn.push({
                  'location': {
                    lat: vm.returnRoute.pickupPoint[i].pickupLat,
                    lng: vm.returnRoute.pickupPoint[i].pickupLong
                  }
                });
              }
            });
        });
    });
  }
})();
