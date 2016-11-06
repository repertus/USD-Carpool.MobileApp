(function() {
  'use strict';

  angular
    .module('app')
    .controller('VehicleDetailController', VehicleDetailController);

  VehicleDetailController.$inject = ['vehicleFactory', '$stateParams', '$state', '$cordovaCamera', '$ionicActionSheet', '$scope', '$timeout', 'toastr'];

  /* @ngInject */
  function VehicleDetailController(vehicleFactory, $stateParams, $state, $cordovaCamera, $ionicActionSheet, $scope, $timeout, toastr) {
    var vm = this;

    //properties
    vm.userVehicle = {
      _id: $stateParams.profileId
    };

    //methods
    vm.addVehicle = addVehicle;
    vm.addVehiclePicture = addVehiclePicture;

    activate();

    function activate() {

    }

    function addVehicle() {
      vehicleFactory.addVehicle(vm.userVehicle).then(
        function() {
          $state.go('tab.vehicle-grid', {profileId: $stateParams.profileId});
        }
      );
    }

    function addVehiclePicture() {
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: 'Update'
        }],
        destructiveText: 'Delete',
        titleText: 'Update your Vehicle Picture',
        cancelText: 'Cancel',
        cancel: function() {},
        //Deletes the vehicle renderede image from the screen
        destructiveButtonClicked: function() {
          vm.vehiclePicture = '';
          console.log(vm.vehiclePicture);
          return true;
        },
        //Takes vehicle picture and provides a base64 image that is
        //rendered on the screen before uploading into the server
        buttonClicked: function(index) {
          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: 0,
            targetWidth: 100,
            targetHeight: 100,
            cameraDirection: 0,
            saveToPhotoAlbum: false,
            correctOrientation: false
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            vm.userVehicle.vehicle.vehiclePic = "data:image/jpeg;base64," + imageData;
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
  }
})();
