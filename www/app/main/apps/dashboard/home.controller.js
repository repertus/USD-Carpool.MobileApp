(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['profileFactory', '$scope'];

  /* @ngInject */
  function HomeController(profileFactory, $scope) {
    var vm = this;

    //Properties
    var profileId = "58158d20f998ef47191ce743";

    //Methods
    vm.updateDriver = updateDriver;

    //Updates the driver status for a participant from inactive to activate
    //to allow the user to set a drive schedule and update cars
    function updateDriver() {
      profileFactory.updateProfile(vm.profile).then(
        function() {}
      );
    }

    //Allows for a smooth transtion of profile picture from
    //the default avatar image during the start-up along with profile information
    $scope.$on('$ionicView.beforeEnter', function() {
         profileFactory.getByProfile(profileId).then(
          function(profile) {
            vm.profile = profile.user;
          }
        );
  });
  }


})();
