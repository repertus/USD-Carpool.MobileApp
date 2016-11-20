(function() {
  'use strict';

  angular
    .module('app')
    .controller('TripRouteController', TripRouteController);

  TripRouteController.$inject = ['tripRoutesFactory', 'sharedDataFactory', 'profileFactory', '$q', 'toastr', '$scope', '$ionicModal', '$ionicFilterBar', '$stateParams'];

  /* @ngInject */
  function TripRouteController(tripRoutesFactory, sharedDataFactory, profileFactory, $q, toastr, $scope, $ionicModal, $ionicFilterBar, $stateParams) {
    var vm = this;

    //Properties
    var filterBarInstance;
    var i = 0;
    var myLatlng = new google.maps.LatLng(32.771952, -117.188150);

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

    // Closes the modal and resets the google map routes to null
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
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      vm.directionsDisplay.setMap(map);

      vm.map = map;
    }

    //Opens the modal and calls google maps to render
    function openModal(index) {
      $scope.oModal.show();
      googleMaps();
      //Sets the modal toggle button positions per selected user driver route
      for (i = 0; i < vm.routes.length; i++) {
        if (vm.routes[i]._id == vm.originationId && index == 1) {
          vm.routes[i].myStartRoute = true;
          vm.calculateAndDisplayRoute(vm.routes[i], vm.directionsService, vm.directionsDisplay);
        } else if (vm.routes[i]._id == vm.returnId && index == 2) {
          vm.routes[i].myStartRoute = true;
          vm.calculateAndDisplayRoute(vm.routes[i], vm.directionsService, vm.directionsDisplay);
        } else {
          vm.routes[i].myStartRoute = false;
        };
      };
    };

    //Filters routes through the search bar in the modal per user input
    function showFilterBar() {
      filterBarInstance = $ionicFilterBar.show({
        items: vm.routes,
        update: function(filteredItems) {
          vm.routes = filteredItems;
        },
        filterProperties: 'routeName'
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

          var driver = vm.profile.driver;
          vm.driverRole = driver[0].driverRole;
          vm.originationId = driver[0].originationId;
          vm.returnId = driver[0].returnId;

          //Pulls the origination route per the user parameter
          tripRoutesFactory.getByRouteId(vm.originationId).then(
            function(originationRoute) {
              vm.originationRoute = originationRoute.route;
            }
          );

          //Pulls the return route per the user parameter
          tripRoutesFactory.getByRouteId(vm.returnId).then(
            function(returnRoute) {
              vm.returnRoute = returnRoute.route;
            }
          );


        });
    });
  }
})();
