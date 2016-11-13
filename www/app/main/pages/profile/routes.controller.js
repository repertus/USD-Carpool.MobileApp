(function() {
  'use strict';

  angular
    .module('app')
    .controller('TripRouteController', TripRouteController);

  TripRouteController.$inject = ['tripRoutesFactory', 'sharedDataFactory', '$q', 'toastr', '$scope', '$ionicModal', '$ionicFilterBar', '$stateParams'];

  /* @ngInject */
  function TripRouteController(tripRoutesFactory, sharedDataFactory, $q, toastr, $scope, $ionicModal, $ionicFilterBar, $stateParams) {
    var vm = this;

    //Properties
    var filterBarInstance;
    var i = 0;
    var myLatlng = new google.maps.LatLng(32.771952, -117.188150);

    //Methods
    vm.activeOriginationRoute = activeOriginationRoute;
    vm.calculateAndDisplayRoute = calculateAndDisplayRoute;
    vm.closeModal = closeModal;
    vm.directionsService = new google.maps.DirectionsService;
    vm.directionsDisplay = new google.maps.DirectionsRenderer;
    vm.openModal = openModal;
    vm.profileId = $stateParams.profileId;
    vm.showFilterBar = showFilterBar;

    activate();

    /////////////////////////////////////////////////////////////////

    function activate() {
      //Calls the carpool routes from the server through the factory
      tripRoutesFactory.getAllRoutes().then(
        function(data) {
          vm.routes = data.routes;
        }
      );
    }

    function activeOriginationRoute(route) {
         var index = vm.routes.indexOf(route);

         for(i = 0; i < vm.routes.length; i++)
         {
              if(i != index && route.originationTrip == true)
              {
                   vm.routes[i].myStartRoute = false;
              };
         };

     //     var vehicleStatusUpdate = {'_id' : vm.profileId, 'vehicle' : vm.vehicles};
         //
     //     vehicleFactory.activeVehicle(vehicleStatusUpdate).then();
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

    function googleMaps(){
         var mapOptions = {
           center: myLatlng,
           zoom: 11,
           mapTypeId: google.maps.MapTypeId.ROADMAP
         };
         var map = new google.maps.Map(document.getElementById("map"), mapOptions);
         vm.directionsDisplay.setMap(map);

         vm.map = map;
    }

    //Filters routes through the search bar in the modal per user input
    function showFilterBar() {
      filterBarInstance = $ionicFilterBar.show({
        items: vm.routes,
        update: function (filteredItems) {
          vm.routes = filteredItems;
        },
        filterProperties: 'routeName'
      });
    };

    // Modal 1 - Origination routes list
    $ionicModal.fromTemplateUrl('origination-route.html', {
         id: '1',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Modal 2 - Return routes list
    $ionicModal.fromTemplateUrl('return-route.html', {
         id: '2',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    function openModal(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
      googleMaps();
    };

    function closeModal(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
      vm.map.remove();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
    });

    //Pulls the profile data from the home tab
    $scope.$on('$ionicView.enter', function() {
      vm.profile = sharedDataFactory.getProfile();
      var driver = vm.profile.driver;
      vm.originationId = driver[0].originationId;
      vm.returnId = driver[0].returnId;

      tripRoutesFactory.getByRouteId(vm.originationId).then(
           function (originationRoute) {
                vm.originationRoute = originationRoute.route;
           }
      );

      tripRoutesFactory.getByRouteId(vm.returnId).then(
           function (returnRoute) {
                vm.returnRoute = returnRoute.route;
           }
      );
    });

  }
})();
