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
    vm.directionsService = new google.maps.DirectionsService;
    vm.directionsDisplay = new google.maps.DirectionsRenderer;
    var filterBarInstance;
    var myLatlng = new google.maps.LatLng(32.771952, -117.188150);

    //Methods
    vm.calculateAndDisplayRoute = calculateAndDisplayRoute;
    vm.openModal = openModal;
    vm.profileId = $stateParams.profileId;
    vm.showFilterBar = showFilterBar;

    /////////////////////////////////////////////////////////////////

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
    };

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
      var returnId = driver[0].returnId;

      tripRoutesFactory.getByRouteId(originationId).then(
           function (originationRoute) {
                vm.originationRoute = originationRoute.route;
           }
      );

      tripRoutesFactory.getByRouteId(returnId).then(
           function (returnRoute) {
                vm.returnRoute = returnRoute.route;
           }
      );
    });

  }
})();
