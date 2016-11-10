(function() {
  'use strict';

  angular
    .module('app')
    .controller('TripRouteController', TripRouteController);

  TripRouteController.$inject = ['tripRoutesFactory', '$q', 'toastr', '$scope'];

  /* @ngInject */
  function TripRouteController(tripRoutesFactory, $q, toastr, $scope) {
    var vm = this;

    activate();

    function activate() {
         var myLatlng = new google.maps.LatLng(32.7157, -117.1611);

        var mapOptions = {
          center: myLatlng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
         var map = new google.maps.Map(document.getElementById("map"), mapOptions);

         vm.map = map;




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
  }
})();
