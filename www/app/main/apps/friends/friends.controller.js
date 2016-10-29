(function() {
    'use strict';

    angular
        .module('app')
        .controller('FriendsController', FriendsController);

    FriendsController.$inject = ['friendsFactory'];

    /* @ngInject */
    function FriendsController(friendsFactory) {
        var vm = this;

        activate();

        function activate() {
             vm.chats = friendsFactory.all();
             vm.remove = function(chat) {
               friendsFactory.remove(chat);
             };
        }
    }
})();
