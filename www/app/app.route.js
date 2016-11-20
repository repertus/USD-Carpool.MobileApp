(function() {
    'use strict';

    angular
      .module('app')
      .config(routeConfig);

    routeConfig.$inject = ["$urlRouterProvider", "$stateProvider"];

    function routeConfig($urlRouterProvider, $stateProvider) {

      $stateProvider
      /////// Login State ///////

      /////// User States ///////
        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'app/main/navigation/tabs.html'
        })

          /////// Dashboard State///////
          .state('tab.home', {
               url: '/home',
               views: {
                 'tab-home': {
                   templateUrl: 'app/main/apps/dashboard/tab-home.html',
                   controller: 'HomeController as vm'
                 }
               }
          })

          /////// Profile States ///////
          .state('tab.profile', {
               url:'/profile',
               views: {
                    'tab-profile': {
                         templateUrl: 'app/main/pages/profile/tab-profile.html',
                         controller: 'ProfileController as vm'
                    }
               }
          })
          .state('tab.myinfo', {
               url: '/myinfo/:profileId',
               views: {
                    'tab-profile': {
                         templateUrl: 'app/main/pages/profile/tab-myinfo.html',
                         controller: 'MyInfoController as vm'
                    }
               }
          })
          .state('tab.route', {
               url: '/route/:profileId',
               views: {
                    'tab-profile': {
                         templateUrl: 'app/main/pages/profile/tab-route.html',
                         controller: 'TripRouteController as vm'
                    }
               }
          })
          .state('tab.pickup', {
               url: '/pickup/:profileId',
               views: {
                    'tab-profile': {
                         templateUrl: 'app/main/pages/profile/tab-pickup.html',
                         controller: 'TripPickupController as vm'
                    }
               }
          })
          .state('tab.vehicle-grid', {
               url: '/vehicle/:profileId',
               views: {
                    'tab-profile': {
                         templateUrl: 'app/main/pages/profile/tab-vehicle-grid.html',
                         controller: 'VehicleGridController as vm'
                    }
               }
          })
          .state('tab.vehicle-detail', {
               url: '/vehicle?profileId',
               views: {
                    'tab-profile': {
                         templateUrl: 'app/main/pages/profile/tab-vehicle-detail.html',
                         controller: 'VehicleDetailController as vm'
                    }
               }
          })
        .state('tab.chats', {
            url: '/chats',
            views: {
              'tab-chats': {
                templateUrl: 'templates/tab-chats.html',
                controller: 'FriendsController as vm'
              }
            }
       })
          .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
              'tab-chats': {
                templateUrl: 'templates/chat-detail.html'
               //  controller: 'ChatDetailCtrl'
              }
            }
          })

        .state('tab.account', {
          url: '/account',
          views: {
            'tab-account': {
              templateUrl: 'templates/tab-account.html'
          //     controller: 'AccountCtrl'
            }
          }
        });


     //    .state('tab.dashboard', {
     //      url: '/dashboard',
     //      views: {
     //           templateUrl: 'templates/tab-dash.html'
     //      }
          // controller: 'UserDashboardController as userDashboard',
          // template: 'app/main/apps/dashboard/tab.dashboard.html'
     // });
        /////// Profile States ///////
     //    .state('tab.profile', {
     //      url: '/profile?userId',
     //      controller: 'UserProfileController as userProfile',
     //      template: 'app/main/pages/profile/tab.profile.html'
     //    })
     //    .state('tab.vehicle', {
     //      url: '/vehicle?userId',
     //      controller: 'UserVehicleController as userVehicle',
     //      template: 'app/main/pages/vehicle/tab.vehicle.html'
     //    })
     //    .state('tab.reset', {
     //      url: '/pswd_reset?userId',
     //      controller: 'UserResetController as userReset',
     //      template: 'main/pages/auth/tab.pswd.reset.html'
     //    })
     //    /////// Friend States ///////
     //    .state('tab.friends', {
     //      url: 'friends?userId',
     //      controller: 'UserFriendsController as userFriends',
     //      templates: 'app/main/apps/friends/tab.friends.html'
     //    })
     //    .state('tab.driver_schedule', {
     //      url: 'driver_schedule?userId',
     //      controller: 'DriverScheduleController as driverSchedule',
     //      templates: 'app/main/apps/driver-scheduler/driver.scheduler.html'
     //    })
     //    .state('tab.rider_schedule', {
     //      url: 'rider_schedule?userId',
     //      controller: 'RiderScheduleController as riderSchedule',
     //      templates: 'app/main/apps/rider-scheduler/rider.scheduler.html'
     //    })
     //    .state('tab.trips_schedule', {
     //      url: 'trips_schedule?userId',
     //      controller: 'TripsScheduleController as tripsSchedule',
     //      templates: 'app/main/apps/trips/trip.schedule.html'
     //    });

      $urlRouterProvider.otherwise('/tab/home');
    };
})();
