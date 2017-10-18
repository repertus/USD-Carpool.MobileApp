(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserCredentialsController', UserCredentialsController);

    UserCredentialsController.$inject = ['authFactory', '$scope'];
    function UserCredentialsController(authFactory, $scope) {
        var vm = this;

        //methods
        vm.setCredentials = setCredentials;

        activate();

        ////////////////
        function activate() {}

        function getUserProfile() {
            var profile = JSON.parse(localStorage.getItem('userProfile'));
            var profileName = profile.firstName + ' ' + profile.lastName;

            return profileName;
		}

        function setCredentials(credentials) {
            authFactory.setCredentials(credentials)
                .then(authFactory.emailVerification(user))
                .then(authFactory.setProfileName(getUserProfile()))
                .then(function() {
                    //TODO: Need to add success message modal
                })
                .catch(function(error) {
                    //TODO: Add failure conditions
                });
        }
    }
})();