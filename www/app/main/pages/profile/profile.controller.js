(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['profileFactory', 'sharedDataFactory', '$scope'];

    /* @ngInject */
    function ProfileController(profileFactory, sharedDataFactory, $scope) {
        var vm = this;

        //Pulls the profile data from the home tab
        $scope.$on('$ionicView.beforeEnter', function() {
             vm.profile = sharedDataFactory.getProfile();
             vm.driver = vm.profile.driver;
        });
    }
})();
