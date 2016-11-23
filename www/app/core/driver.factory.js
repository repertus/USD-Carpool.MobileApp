(function() {
    'use strict';

    angular
        .module('app')
        .factory('driverFactory', driverFactory);

    driverFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function driverFactory($http, $q, toastr, apiUrl) {
        var service = {
            activeDriverRoute: activeDriverRoute,
        };

        return service;

        function activeDriverRoute(route) {
             var defer = $q.defer();

             $http.post(apiUrl + '/drivers/' + route._id, route)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error adding driver route', 'Error');
                       }
                  );

             return defer.promise;
        }

        function removeDriverRoute(route) {
             var defer = $q.defer();

             $http.delete(apiUrl + '/drivers/' + route._id, route)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error deleting driver route', 'Error');
                       }
                  );

             return defer.promise;
         }
    }
})();
