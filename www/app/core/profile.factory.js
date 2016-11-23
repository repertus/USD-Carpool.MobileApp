(function() {
  'use strict';

  angular
    .module('app')
    .factory('profileFactory', profileFactory);

  profileFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

  /* @ngInject */
  function profileFactory($http, $q, toastr, apiUrl) {
    var service = {
      getByProfile: getByProfile,
      updateProfile: updateProfile
    };

    return service;

    function getByProfile(id) {
      var defer = $q.defer();

      $http.get(apiUrl + '/users/' + id)
        .then(
          function(response) {
            defer.resolve(response.data);
          },
          function(error) {
            defer.reject(error);
            toastr.error('Error getting profile detail', 'Error');
          }
        );

      return defer.promise;
    }

    function updateProfile(profile) {
        var defer = $q.defer();

         $http.put(apiUrl + '/users/' + profile._id, profile)
              .then(
                   function() {
                        defer.resolve();
                        toastr.success('Successfully updated profile', 'Saved');
                   },
                   function(error) {
                        defer.reject(error);
                        toastr.error('Error updating profile', 'Error');
                   }
              );

              return defer.promise;
    }
  }
})();
