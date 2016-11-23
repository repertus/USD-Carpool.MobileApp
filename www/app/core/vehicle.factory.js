(function() {
    'use strict';

    angular
        .module('app')
        .factory('vehicleFactory', vehicleFactory);

    vehicleFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function vehicleFactory($http, $q, toastr, apiUrl) {
        var service = {
             activeVehicle: activeVehicle,
             addVehicle: addVehicle,
            getVehicles: getVehicles,
            removeVehicle: removeVehicle
        };

        return service;

        function activeVehicle(vehicle) {
            var defer = $q.defer();

             $http.put(apiUrl + '/users/' + vehicle._id, vehicle)
                  .then(
                       function() {
                            defer.resolve();
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error updating vehicle', 'Error');
                       }
                  );

                  return defer.promise;
        }

        function addVehicle(userVehicle) {
            var defer = $q.defer();

            $http.post(apiUrl + '/vehicles/' + userVehicle._id, userVehicle)
                  .then(
                       function() {
                            defer.resolve();
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error updating item', 'Error');
                       }
                  );

                  return defer.promise;
        }

        function getVehicles(id) {
             var defer = $q.defer();

             $http.get(apiUrl + '/users/' + id)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting vehicle list', 'Error');
                       }
                  );

             return defer.promise;
        }

        function removeVehicle(vehicle) {
             var defer = $q.defer();

             $http.put(apiUrl + '/vehicles/' + vehicle._id, vehicle)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error deleting item', 'Error');
                       }
                  );

             return defer.promise;
         }
    }
})();
