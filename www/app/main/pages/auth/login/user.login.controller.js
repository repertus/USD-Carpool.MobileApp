(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserLoginController', UserLoginController);

    UserLoginController.$inject = ['$scope'];

    /* @ngInject */
    function UserLoginController($scope) {
        var vm = this;

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
                  alert('our form is amazing');
             }
        }

     //    $scope.$on('$ionicView.beforeEnter', function() {
     //         angular.element(document).find('ion-nav-bar').addClass('navbarToggle');
     //         angular.element(document).find('ion-content').addClass('borderRemove');
     //   });
    }
})();
