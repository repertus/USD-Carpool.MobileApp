(function() {
    'use strict';

    angular
        .module('app')
        .controller('VehicleDetailController', VehicleDetailController);

    VehicleDetailController.$inject = ['vehicleFactory', '$stateParams', '$state'];

    /* @ngInject */
    function VehicleDetailController(vehicleFactory, $stateParams, $state) {
        var vm = this;

        //properties
        vm.userVehicle = {_id: $stateParams.profileId};

        //methods
        vm.updateVehicle = updateVehicle;

        activate();

        function activate() {

        }

        function updateVehicle() {
             vehicleFactory.updateVehicle(vm.userVehicle).then(
                  function(){
                       $state.go('tab.vehicle-grid');
                  }
             );
        }
    }
})();
