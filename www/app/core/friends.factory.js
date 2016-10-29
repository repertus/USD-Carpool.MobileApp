(function() {
    'use strict';

    angular
        .module('app')
        .factory('friendsFactory', friendsFactory);

    friendsFactory.$inject = [];

    /* @ngInject */
    function friendsFactory() {
         var chats = [{
          id: 0,
          name: 'Ben Sparrow',
          lastText: 'You on your way?',
          face: 'img/ben.png'
        }, {
          id: 1,
          name: 'Max Lynx',
          lastText: 'Hey, it\'s me',
          face: 'img/max.png'
        }, {
          id: 2,
          name: 'Adam Bradleyson',
          lastText: 'I should buy a boat',
          face: 'img/adam.jpg'
        }, {
          id: 3,
          name: 'Perry Governor',
          lastText: 'Look at my mukluks!',
          face: 'img/perry.png'
        }, {
          id: 4,
          name: 'Mike Harrington',
          lastText: 'This is wicked good ice cream.',
          face: 'img/mike.png'
        }];
        
        var service = {
            all: all,
            get: get,
            remove: remove
        };

        return service;

        function all(){
             return chats;
        }

        function get(chatId){
             for (var i = 0; i < chats.length; i++) {
               if (chats[i].id === parseInt(chatId)) {
                return chats[i];
               }
             }
             return null;
        }

        function remove(chat) {
             chats.splice(chats.indexOf(chat), 1);
        }

    }
})();
