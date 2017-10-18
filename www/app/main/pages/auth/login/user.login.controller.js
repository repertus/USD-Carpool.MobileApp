(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserLoginController', UserLoginController);

    UserLoginController.$inject = ['$scope', 'authFactory'];

    /* @ngInject */
    function UserLoginController($scope, authFactory) {
        var vm = this;

        //Properties
        var user = vm.user;

        //Methods
        vm.inputStatus = inputStatus;
        vm.login = login;

        activate();

        function activate() {

        }

        function inputStatus() {
             console.log('hey');
             if (vm.user.email == undefined) {
               //    angular.element(document).find('div').hasClass('required').removeClass('hideMessage').addClass('formErrors');
               console.log('hello');
             }
        }

        function login(isValid) {
            if(isValid) {
                authFactory.loginUser(vm.user)
                    .then(function (userId) {
                        console.log(userId);
                    });
            }
        }

     //    $scope.$on('$ionicView.beforeEnter', function() {
     //         angular.element(document).find('ion-nav-bar').addClass('navbarToggle');
     //         angular.element(document).find('ion-content').addClass('borderRemove');
     //   });
    }
})();
