(function() {
    'use strict';

    angular
        .module('app')
        .factory('uploadFactory', uploadFactory);

    uploadFactory.$inject = ['$http', '$q', 'toastr'];

    /* @ngInject */
    function uploadFactory($http, $q, toastr) {
        var service = {
            uploadPic: uploadPic
        };

        return service;

        function uploadPic(localUrl) {
             var defer = $q.defer();

             $http.post('https://www.filepicker.io/api/store/S3?key=AYIVeFVdTQYi3FrkEDew4z' + '&mimetype=img/jpeg', localUrl)
                  .then(
                       function(blob) {
                         //    defer.resolve(response.data);
                         //    toastr.success('Successfully added task', 'Saved');
                       },
                       function(FPError) {
                         //    defer.reject(error);
                         //    toastr.error('Error adding task', 'Error');
                       }
                  );

             return defer.promise;
        }
    }
})();
