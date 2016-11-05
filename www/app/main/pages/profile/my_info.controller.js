(function() {
    'use strict';

    angular
        .module('app')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['profileFactory', 'schoolFactory', 'uploadFactory', '$stateParams', '$state', '$cordovaCamera', '$cordovaFileTransfer', 'toastr'];

    /* @ngInject */
    function MyInfoController(profileFactory, schoolFactory, uploadFactory, $stateParams, $state, $cordovaCamera, $cordovaFileTransfer, toastr) {
         var vm = this;

        //properties
        var profileId = $stateParams.profileId;

        //methods
        vm.getAllSchools = getAllSchools;
        vm.takeSelfPicture = takeSelfPicture;
        vm.updateProfile = updateProfile;

        activate();

        function activate() {
          //    var profileId = "57fecaca9d8db436ab73208a";

             profileFactory.getByProfile(profileId).then(
                  function (profile) {
                       vm.profile = profile.user;
                  }
             );
        }

        function updateProfile(profile) {
             profileFactory.updateProfile(profile).then(
                  function(){
                       $state.go('tab.profile');
                  }
             );
        }

        function getAllSchools(){
             schoolFactory.getAllSchools().then(
                  function(schoolData){
                       vm.schools = schoolData;
                  }
             );
        }

        function takeSelfPicture() {
             var options = {
                  quality: 50,
               //    destinationType: Camera.DestinationType.FILE_URI,
                  destinationType: Camera.DestinationType.DATA_URL,
                  sourceType: Camera.PictureSourceType.CAMERA,
                  allowEdit: true,
                  encodingType: 0,
                  targetWidth: 100,
                  targetHeight: 100,
                  cameraDirection: 1,
                  saveToPhotoAlbum: true,
                  correctOrientation: true
             };

             $cordovaCamera.getPicture(options).then(function(imageData){
                  vm.selfPic = imageData;
                  vm.test = "data:image/jpeg;base64," + imageData;

               //    var server = "https://www.filepicker.io/api/store/S3?key=AYIVeFVdTQYi3FrkEDew4z";
               //    var fileURL = imageData;
               //    var options = {
               //         fileKey: 'avatar',
               //         fileName: fileURL.substr(fileURL.lastIndexOf('/')+1),
               //         mimetype: 'image/jpeg'
               //    };
                  //
               //    $cordovaFileTransfer.upload(server, fileURL, options)
               //       .then(function(result) {
               //         console.log("Success" + JSON.stringify(result.response));
               //       }, function(err) {
               //         console.log("Error" + err);
               //       }, function (progress) {
               //         constant progress updates
               //       });

                    //    uploadFactory.uploadPic(imageData).then(
                    //         function(blob){
                    //              console.log(blob);
                    //         }
                    //    );

               //    filepickerService.store(imageData,
               //         {mimetype: 'image/*'},
               //         function(blob){
               //              var location = blob;
               //         },
               //         function(FPError){
               //              console.log(FPError.toString());
               //         }
               //    );

             }, function(err){
                  toastr.error('Error taking picture', 'Error');
             });
        }
    }
})();
