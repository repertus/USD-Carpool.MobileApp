(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['profileFactory'];

    /* @ngInject */
    function HomeController(profileFactory) {
        var vm = this;

        //Properties
        var profileId = "58158d20f998ef47191ce743";

        //Methods
        vm.updateDriver = updateDriver;

        activate();

        function activate() {
             profileFactory.getByProfile(profileId).then(
                  function (profile) {
                       vm.profile = profile.user;
                  }
             );
        }
        function updateDriver() {
             profileFactory.updateProfile(vm.profile).then(
                  function(){}
             );
        }
    }
})();
