(function() {
    'use strict';

    angular
        .module('app')
        .controller('VehicleGridController', VehicleGridController);

    VehicleGridController.$inject = ['vehicleFactory', '$stateParams', '$state'];

    /* @ngInject */
    function VehicleGridController(vehicleFactory, $stateParams, $state) {
         var vm = this;

        //properties
        var i = 0;
        var profileId = {};

        //methods
        vm.activeVehicle = activeVehicle;
        vm.shouldShowDelete = false;
        vm.removeVehicle = removeVehicle;
        vm.profileId = $stateParams.profileId;

        activate();

        function activate() {
             vehicleFactory.getVehicles(vm.profileId).then(
                  function (vehicle_data) {
                       vm.vehicles = vehicle_data.user.vehicle;
                  }
             );
        }


        function activeVehicle(vehicle) {
             var index = vm.vehicles.indexOf(vehicle);

             for(i = 0; i < vm.vehicles.length; i++)
             {
                  if(i != index)
                  {
                       vm.vehicles[i].vehicleActiveStatus = false;
                  };
             };

             var vehicleStatusUpdate = {'_id' : vm.profileId, 'vehicle' : vm.vehicles};

             vehicleFactory.activeVehicle(vehicleStatusUpdate).then();
        }

        function removeVehicle(vehicle) {
             var vehicleRemoved = {'_id' : vm.profileId, 'vehicle' : vehicle}

             vehicleFactory.removeVehicle(vehicleRemoved).then(
                  function(){
                       var index = vm.vehicles.indexOf(vehicle);
                       vm.vehicles.splice(index, 1);
                  }
             );
        }
    }
})();
