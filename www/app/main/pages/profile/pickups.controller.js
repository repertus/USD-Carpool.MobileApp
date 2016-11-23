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
    var originationRoute = [];
    var passenger = [];
    var passengerOriginationRoute = [];
    var passengerOriginationPoint = {};
    var passengerReturnRoute = [];
    var passengerReturnPoint = {};
    var returnPickups = [];
    var returnRoute = [];
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
    function activeRoute(pickup) {
      var index = vm.pickups.indexOf(pickup);

      for (i = 0; i < vm.pickups.length; i++) {
        if (i != index) {
          vm.pickups[i].myStartRoute = false;
        }

        if (vm.status == true && vm.pickups[i].myStartRoute == true) {
             passenger[0].originationPickupId = vm.pickups[i]._id;
             passenger[0].originationRouteId = originationRoute._id;
             vm.originationPickupName = vm.pickups[i].locationName;
          var pickupPointUpdate = {
            '_id': vm.profileId,
            'pickupPoint': passenger
          };
          var newPassengerOriginationPoint = {
               'lat': vm.pickups[i].pickupLat,
               'lng': vm.pickups[i].pickupLong
          };
          googleMapMarkers(originationRoute, originationPickups, newPassengerOriginationPoint);
     } else if (vm.status != true && vm.pickups[i].myStartRoute == true) {
          passenger[0].returnPickupId = vm.pickups[i]._id;
          passenger[0].returnRouteId = returnRoute._id;
          vm.returnPickupName = vm.pickups[i].locationName;
          var pickupPointUpdate = {
            '_id': vm.profileId,
            'pickupPoint': passenger
          };
          var newPassengerReturnPoint = {
               'lat': vm.pickups[i].pickupLat,
               'lng': vm.pickups[i].pickupLong
          };
          googleMapMarkers(returnRoute, returnPickups, newPassengerReturnPoint);
        }
      };

       profileFactory.updateProfile(pickupPointUpdate).then();
    }

    //Displays the pickup points on the Google Maps screen
    function calculateAndDisplayRoute(route, waypts, directionsService, directionsDisplay) {
      directionsService.route({
        origin: waypts[0].location,
        destination: waypts[2].location,
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
        control: {},
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById('map'), mapOptions);

      vm.directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
      });

      vm.directionsDisplay.setMap(map);
      vm.map = map;
    }

    //Loop through array of pickup points & places marker for each one on the map
    function googleMapMarkers(route, pickupPoints, passengerPickupPoint) {
      vm.route = route;
      vm.routeName = route.routeName;
      vm.pickups = pickupPoints;

      // Allow each marker to have an info window
      var infoWindow = new google.maps.InfoWindow(),
        marker, i;
      var icon = [];

      //Sets unique color marker for pick-up point
      for (i = 0; i < pickupPoints.length; i++) {
        if (pickupPoints[i].pickupLat == passengerPickupPoint.lat && pickupPoints[i].pickupLong == passengerPickupPoint.lng) {
          icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        } else {
          icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        };

        var position = new google.maps.LatLng(pickupPoints[i].pickupLat, pickupPoints[i].pickupLong);
        marker = new google.maps.Marker({
          position: position,
          icon: icon,
          map: vm.map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infoWindow.setContent(pickupPoints[i].locationName);
            infoWindow.open(map, marker);
          }
        })(marker, i));
      }
    }



    //Opens the modal and calls google maps to render
    function openModal(index) {
      $scope.oModal.show();
      googleMaps();

      if (index == 1) {
        googleMapMarkers(originationRoute, originationPickups, passengerOriginationPoint);
        vm.calculateAndDisplayRoute(vm.originationRoute, wayptsOrigination, vm.directionsService, vm.directionsDisplay);
      } else if (index == 2) {
        googleMapMarkers(returnRoute, returnPickups, passengerReturnPoint);
        vm.calculateAndDisplayRoute(vm.returnRoute, wayptsReturn, vm.directionsService, vm.directionsDisplay);
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
            function(routes) {
              originationRoute = routes.route;
              originationPickups = originationRoute.pickupPoint;

              //Resets Origination waypoints
              wayptsOrigination = [];

              for (i = 0; i < originationPickups.length; i++) {
                if (originationPickups[i]._id == passenger[0].originationPickupId) {
                  vm.originationPickupName = originationPickups[i].locationName;
                  passengerOriginationPoint = {
                    'lat': originationPickups[i].pickupLat,
                    'lng': originationPickups[i].pickupLong
                  }
                };
                wayptsOrigination.push({
                  'location': {
                    lat: originationPickups[i].pickupLat,
                    lng: originationPickups[i].pickupLong
                  }
                });
              }
            });

          //Pulls the return pickup point per the user parameter
          tripRoutesFactory.getByRouteId(vm.returnRouteId).then(
            function(routes) {
              returnRoute = routes.route;
              returnPickups = returnRoute.pickupPoint;

              //Resets Return waypoints
              wayptsReturn = [];

              for (i = 0; i < returnPickups.length; i++) {
                if (returnPickups[i]._id == passenger[0].returnPickupId) {
                  vm.returnPickupName = returnPickups[i].locationName;
                  passengerReturnPoint = {
                    'lat': returnPickups[i].pickupLat,
                    'lng': returnPickups[i].pickupLong
                  }
                };
                wayptsReturn.push({
                  'location': {
                    lat: returnPickups[i].pickupLat,
                    lng: returnPickups[i].pickupLong
                  }
                });
              }
            });
        });
    });
  }
})();
