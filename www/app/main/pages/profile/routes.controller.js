(function() {
    'use strict';

    angular
        .module('app')
        .controller('TripRouteController', TripRouteController);

    TripRouteController.$inject = ['tripRoutesFactory', '$q', 'toastr'];

    /* @ngInject */
    function TripRouteController(tripRoutesFactory, $q, toastr) {
        var vm = this;

        activate();

        function activate() {
             tripRoutesFactory.getAllRoutes().then(
                  function (routes) {
                       vm.routes = routes;
                  }
             );
        }
    }
})();
