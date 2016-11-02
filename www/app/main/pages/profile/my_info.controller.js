(function() {
    'use strict';

    angular
        .module('app')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['profileFactory', 'schoolFactory', '$stateParams', '$state', '$cordovaCamera', 'toastr'];

    /* @ngInject */
    function MyInfoController(profileFactory, schoolFactory, $stateParams, $state, $cordovaCamera, toastr) {
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
                  saveToPhotoAlbum: false,
                  correctOrientation: true
             };


             $cordovaCamera.getPicture(options).then(function(imageData){
                  //var image = document.getElementById('myImage');
               //    image.src = 'data:image/jpeg;based64,' + imageData;
                  vm.selfPic = 'data:image/jpeg;based64,' + imageData;
             }, function(err){
                  toastr.error('Error taking picture', 'Error');
             });
        }
    }
})();
