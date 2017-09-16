(function() {
  'use strict';

  angular
    .module('app')
    .config(['$firebase', function($firebase) {
      $firebase.config({
        apiKey: "AIzaSyB1i2swvgGsbNZylsIHFQfWSOjRkCQi1Tw",
        authDomain: "usd-carpool.firebaseapp.com",
        databaseURL: "https://usd-carpool.firebaseio.com",
        projectId: "usd-carpool",
        storageBucket: "usd-carpool.appspot.com",
        messagingSenderId: "72591002426"
      }); 
    }])
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      })

      firebase.initializeApp($firebase.config);
    });
})();
