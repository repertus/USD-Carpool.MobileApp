(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['profileFactory'];

    /* @ngInject */
    function ProfileController(profileFactory) {
        var vm = this;

        //properties
        vm.profileId = "58158d20f998ef47191ce743";


        //methods

        activate();

        function activate() {
          //    var profileId = "57fecaca9d8db436ab73208a";
             //
          //    profileFactory.getByProfile(profileId).then(
          //         function (profile) {
          //              vm.profile = profile.user;
          //         }
          //    );
        }
    }
})();
