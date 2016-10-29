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
        vm.removeVehicle = removeVehicle;
        vm.profileId = $stateParams.profileId;

        activate();

        function activate() {
             vehicleFactory.getVehicles(vm.profileId).then(
                  function (vehicle_data) {
                       vm.cars = vehicle_data.user.vehicle;
                  }
             );
          //    vm.cars = vehicleFactory.all();
        }


        function activeVehicle(car) {
             var index = vm.cars.indexOf(car);

             for(i = 0; i < vm.cars.length; i++)
             {
                  if(i != index)
                  {
                       vm.cars[i].vehicleActiveStatus = false;
                  };
             };

             var vehicleStatusUpdate = {'_id' : vm.profileId, 'vehicle' : vm.cars};

             vehicleFactory.activeVehicle(vehicleStatusUpdate).then();
        }

        function removeVehicle(vehicle) {
             vehicleFactory.remove(vehicle).then(
                  function(){
                       var index = vm.cars.indexOf(car);
                       vm.cars.splice(index, 1);
                  }
             );
        }
    }
})();
