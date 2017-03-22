(function() {
    'use strict';

    angular
        .module('app')
        .controller('FriendListController', FriendListController);

    FriendListController.$inject = ['friendsFactory', 'sharedDataFactory', '$scope'];

    /* @ngInject */
    function FriendListController(friendsFactory, sharedDataFactory, $scope) {
        var vm = this;

        //properties
        var id  = undefined;
        vm.friendIds = [];

        activate();

        function activate() {
        }

        function getFriendsList() {

        }

        //Pulls the profile data from the home tab
        $scope.$on('$ionicView.beforeEnter', function() {
             vm.profile = sharedDataFactory.getProfile();
             id = vm.profile._id;

             friendsFactory.getFriendsById(id).then(
                  function (list) {
                       var friends = list.friends;
                       for(var i = 0; i < friends.length; i++) {
                         if (friends[i].userOneId == id)
                              vm.friendIds[i] = friends[i].userTwoId;
                         else
                              vm.friendIds = friends[i].userOneId;
                       }
                  }
             );
        });
    }
})();
