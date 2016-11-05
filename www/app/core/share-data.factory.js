(function() {
    'use strict';

    angular
        .module('app')
        .factory('sharedDataFactory', sharedDataFactory);

    sharedDataFactory.$inject = [];

    /* @ngInject */
    function sharedDataFactory() {

         var profile = {};
       var service = {
            getProfile: getProfile,
            setProfile: setProfile
       };

       return service;

       function getProfile() {
            return profile;
       }

       function setProfile(homeProfile) {
            profile = homeProfile;
       }
    }

    // function sharedDataFactory($rootScope) {
    //      var DATA_CHANGE = "DATA_CHANGE_EVENT";
    //
    //     var service = {
    //         changeData: changeData,
    //         onChangeData: onChangeData
    //     };
    //
    //     return service;
    //
    //     function changeData(obj) {
    //          $rootScope.$broadcast(DATA_CHANGE, obj);
    //     }
    //
    //     function onChangeData($scope, handler) {
    //          $scope.$on(DATA_CHANGE, function(event, obj) {
    //             handler(obj);
    //         });
    //     }
    // }
})();
