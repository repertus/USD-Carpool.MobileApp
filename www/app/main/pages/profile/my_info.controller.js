(function() {
    'use strict';

    angular
        .module('app')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['profileFactory', 'schoolFactory', '$stateParams', '$state'];

    /* @ngInject */
    function MyInfoController(profileFactory, schoolFactory, $stateParams, $state) {
         var vm = this;

        //properties
        var profileId = $stateParams.profileId;

        //methods
        vm.getAllSchools = getAllSchools;
        vm.updateProfile = updateProfile;

        activate();

        function activate() {
          //    var profileId = "57fecaca9d8db436ab73208a";

             profileFactory.getByProfile(profileId).then(
                  function (profile) {
                       vm.profile = profile.user;
                  }
             );
        }

        function updateProfile(profile) {
             profileFactory.updateProfile(profile).then(
                  function(){
                       $state.go('tab.profile');
                  }
             );
        }

        function getAllSchools(){
             schoolFactory.getAllSchools().then(
                  function(schoolData){
                       vm.schools = schoolData;
                  }
             );
        }
    }
})();
