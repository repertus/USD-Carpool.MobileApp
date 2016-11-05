(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['profileFactory', 'sharedDataFactory', '$scope'];

    /* @ngInject */
    function ProfileController(profileFactory, sharedDataFactory, $scope) {
        var vm = this;

        //properties
     //    vm.profileId = "58158d20f998ef47191ce743";

     //Methods

        $scope.$on('$ionicView.enter', function() {
             vm.profile = sharedDataFactory.getProfile();
        });

     //    $scope.$on('$ionicView.enter', function() {
     //         sharedDataFactory.onChangeData($scope, function(data){
     //              vm.profileId = data._id;
     //         });
     //    });
    }
})();
