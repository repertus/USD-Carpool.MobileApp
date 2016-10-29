(function() {
    'use strict';

    angular
        .module('app')
        .factory('schoolFactory', schoolFactory);

    schoolFactory.$inject = ['$http'];

    /* @ngInject */
    function schoolFactory($http) {
        var service = {
            getAllSchools: getAllSchools
        };

        return service;

        function getAllSchools() {
             return $http.get('/data/university_domains.json');
        }
    }
})();
