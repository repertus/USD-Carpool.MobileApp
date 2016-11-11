(function() {
    'use strict';

    angular
        .module('app')
        .factory('tripRoutesFactory', tripRoutesFactory);

    tripRoutesFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function tripRoutesFactory($http, $q, toastr, apiUrl) {
        var service = {
            getAllRoutes: getAllRoutes,
            getByRouteId: getByRouteId
        };

        return service;

        function getAllRoutes() {
             var defer = $q.defer();

             $http.get(apiUrl + '/routes')
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting routes', 'Error');
                       }
                  );

             return defer.promise;
        }

        function getByRouteId(id) {
             var defer = $q.defer();

             $http.get(apiUrl + '/routes/' + id)
                  .then(
                       function(response) {
                            defer.resolve(response.data);
                       },
                       function(error) {
                            defer.reject(error);
                            toastr.error('Error getting item detail', 'Error');
                       }
                  );

             return defer.promise;
        }
    }
})();
