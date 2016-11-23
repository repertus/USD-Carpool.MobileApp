(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['profileFactory', 'schoolFactory', '$stateParams', '$state', '$cordovaCamera', '$ionicActionSheet', '$timeout', 'toastr'];

  /* @ngInject */
  function MyInfoController(profileFactory, schoolFactory, $stateParams, $state, $cordovaCamera, $ionicActionSheet, $timeout, toastr) {
    var vm = this;

    //properties
    var profileId = $stateParams.profileId;

    //methods
    vm.getAllSchools = getAllSchools;
    vm.selfPictureUpdate = selfPictureUpdate;
    vm.updateProfile = updateProfile;

    activate();

    function activate() {
      //    var profileId = "57fecaca9d8db436ab73208a";

      profileFactory.getByProfile(profileId).then(
        function(profile) {
          vm.profile = profile.user;
          vm.selfPic = profile.user.picture;
        }
      );
    }

    function getAllSchools() {
      schoolFactory.getAllSchools().then(
        function(schoolData) {
          vm.schools = schoolData;
        }
      );
    }

    function selfPictureUpdate() {
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: 'Update'
        }],
        destructiveText: 'Delete',
        titleText: 'Update your Profile Picture',
        cancelText: 'Cancel',
        cancel: function() {},
        //Deletes the profile image from the server
        destructiveButtonClicked: function() {
          var profile = {
            _id: profileId,
            picture: ''
          };
          profileFactory.updateProfile(profile).then(
            function() {
              vm.selfPic = '';
            }
          );

          return true;
        },
        // Takes the profile picture and provides a base64 image that is uploaded into the server
        buttonClicked: function(index) {
          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: 0,
            targetWidth: 100,
            targetHeight: 100,
            cameraDirection: 1,
            saveToPhotoAlbum: true,
            correctOrientation: false
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            vm.selfPic = "data:image/jpeg;base64," + imageData;

            var profile = {
              _id: profileId,
              picture: vm.selfPic
            };
            profileFactory.updateProfile(profile);

          }, function(err) {
            toastr.error('Error taking picture', 'Error');
          });

          return true;
        }
      });

      // Hide the sheet after four seconds
      $timeout(function() {
        hideSheet();
      }, 4000);
    }

    function updateProfile(profile) {
      profileFactory.updateProfile(profile).then(
        function() {
          $state.go('tab.profile');
        }
      );
    }
  }
})();
