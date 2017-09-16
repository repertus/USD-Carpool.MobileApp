(function() {
    	'use strict';

    	angular
        	.module('app')
        	.controller('UserRegisterController', UserRegisterController);

    	UserRegisterController.$inject = ['schoolFactory', '$cordovaCamera', '$ionicActionSheet', '$scope', '$ionicModal', '$ionicFilterBar'];

    	/* @ngInject */
    	function UserRegisterController(schoolFactory, $cordovaCamera, $ionicActionSheet, $scope, $ionicModal, $ionicFilterBar) {
        	var vm = this;

		//properties
		 var filterBarInstance;
		 vm.profile = {};
		var userProfile = vm.profile;

		//methods
		vm.activeSchool = activeSchool;
		vm.closeModal = closeModal;
		vm.openModal = openModal;
		vm.registerUser = registerUser;
		vm.selfPictureUpdate = selfPictureUpdate;
		vm.showFilterBar = showFilterBar;


        activate();

		////////////////////////////////////////////////////////////////////////

        function activate() {
			schoolFactory.getAllSchools().then(
				function (schools) {
					vm.schools = schools.data;
				}
			);
		}

		function activeSchool(school) {
             var index = vm.schools.indexOf(school);

             for(var i = 0; i < vm.schools.length; i++)
             {
                  if(i != index)
                  {
                       vm.schools[i].schoolActiveStatus = false;
                  }
				  else {
					  console.log(vm.schools[i].name);
					  vm.profile.school = vm.schools[i].name;
				  };
             };

            //  var vehicleStatusUpdate = {'_id' : vm.profileId, 'vehicle' : vm.vehicles};

            //  vehicleFactory.activeVehicle(vehicleStatusUpdate).then();
        }

		// Closes the modal
	    function closeModal() {
	      $scope.oModal.hide();
	    };

		function getUserProfile() {
			return JSON.parse(localStorage.getItem('userProfile'));
		}

		//Opens the modal and calls google maps to render
	    function openModal(index) {
	      $scope.oModal.show();
	    };

		function postUserProfile(userProfile) {
			localStorage.setItem('userProfile', JSON.stringify(userProfile));
		}

		function registerUser(userprofile) {
			var currentUserProfile = getUserProfile();

			if ( currentUserProfile === undefined ) {
				postUserProfile(userProfile);
			}
			else {
				currentUserProfile.firstName = userProfile.firstName;
				currentUserProfile.lastName = userProfile.lastName;
				currentUserProfile.email = userProfile.email;
				currentUserProfile.phone = userProfile.phone;
				currentUserProfile.school = userprofile.school;
				postUserProfile(currentUserProfile);
			}
		}

		function selfPictureUpdate() {
	         	// Show the action sheet
	         	var hideSheet = $ionicActionSheet.show({
	           	buttons: [{
	             		text: 'Set'
	           	}],
	           	destructiveText: 'Delete',
	           	titleText: 'Set your Profile Picture',
	           	cancelText: 'Cancel',
	           	cancel: function() {},
	           	//Deletes the profile image from the server
	           	destructiveButtonClicked: function() {
					vm.selfPic = undefined;
					// var currentUserProfile = JSON.parse(localStorage.getItem('userProfile'));
					var currentUserProfile = getUserProfile();

					delete currentUserProfile.picture;
					postUserProfile(currentUserProfile);

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
						// var currentUserProfile = JSON.parse(localStorage.getItem('userProfile'));
						var currentUserProfile = getUserProfile();

						currentUserProfile.picture = vm.selfPic;
						postUserProfile(currentUserProfile);

		             	}, function(err) {
		               	toastr.error('Error taking picture', 'Error');
		             	});

		             	return true;
	           	}
	        })
	    }

		//Filters routes through the search bar in the modal per user input
	    function showFilterBar() {
	      filterBarInstance = $ionicFilterBar.show({
	        items: vm.schools,
	        update: function(filteredItems) {
	          vm.schools = filteredItems;
	        },
	        filterProperties: 'name'
	      });
	    };

		/////////////////////Ionic Functions///////////////////////////////////

		// Modal - School Listings
		$ionicModal.fromTemplateUrl('school-list.html', {
		  scope: $scope,
		  animation: 'slide-in-up'
		}).then(function(modal) {
		  $scope.oModal = modal;
		});

		// Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function() {
		  console.log('Destroying modals...');
		  $scope.oModal.remove();
		});
    }
})();
