(function() {
  'use strict';

  angular.module('app').factory('friendsFactory', friendsFactory);

  friendsFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

  /* @ngInject */
  function friendsFactory($http, $q, toastr, apiUrl) {
    var service = {
      addFriend: addFriend,
      getFriendsById: getFriendsById,
      updateFriend: updateFriend
    };

    return service;

    function addFriend(friend) {
      var defer = $q.defer();

      $http.post(apiUrl + '/friends', friend).then(function(response) {
        defer.resolve(response.data);
        toastr.success('Successfully added friend', 'Saved');
      }, function(error) {
        defer.reject(error);
        toastr.error('Error adding friend', 'Error');
      });

      return defer.promise;
    }

    function getFriendsById(id) {
         var defer = $q.defer();

         $http.get(apiUrl + '/friends/' + id)
              .then(
                   function(response) {
                        defer.resolve(response.data);
                   },
                   function(error) {
                        defer.reject(error);
                        toastr.error('Error getting friends', 'Error');
                   }
              );

         return defer.promise;
    }

    function updateFriend(friend) {
      var defer = $q.defer();

      $http.put(apiUrl + '/friends/' + friend._id, friend).then(function() {
        defer.resolve();
        toastr.success('Successfully updated item', 'Saved');
      }, function(error) {
        defer.reject(error);
        toastr.error('Error updating item', 'Error');
      });

      return defer.promise;
    }
  }
})();
