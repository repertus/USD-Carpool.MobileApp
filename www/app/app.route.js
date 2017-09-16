(function() {
  'use strict';

  angular.module('app').config(routeConfig);

  routeConfig.$inject = ["$urlRouterProvider", "$stateProvider"];

  function routeConfig($urlRouterProvider, $stateProvider) {

    $stateProvider
    /////// Login State ///////
      .state('login', {
           url: '/login',
           controller: 'UserLoginController as vm',
           templateUrl: 'app/main/pages/auth/login/user.login.html'
      })

    /////// Registration State ///////
        .state('register', {
            url: '/register',
            controller: 'UserRegisterController as vm',
            templateUrl: 'app/main/pages/auth/register/user.registration.html'
        })

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
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'app/main/pages/profile/tab-profile.html',
          controller: 'ProfileController as vm'
        }
      }
    }).state('tab.myinfo', {
      url: '/myinfo/:profileId',
      views: {
        'tab-profile': {
          templateUrl: 'app/main/pages/profile/tab-myinfo.html',
          controller: 'MyInfoController as vm'
        }
      }
    }).state('tab.route', {
      url: '/route/:profileId',
      views: {
        'tab-profile': {
          templateUrl: 'app/main/pages/profile/tab-route.html',
          controller: 'TripRouteController as vm'
        }
      }
    }).state('tab.pickup', {
      url: '/pickup/:profileId',
      views: {
        'tab-profile': {
          templateUrl: 'app/main/pages/profile/tab-pickup.html',
          controller: 'TripPickupController as vm'
        }
      }
    }).state('tab.vehicle-grid', {
      url: '/vehicle/:profileId',
      views: {
        'tab-profile': {
          templateUrl: 'app/main/pages/profile/tab-vehicle-grid.html',
          controller: 'VehicleGridController as vm'
        }
      }
    }).state('tab.vehicle-detail', {
      url: '/vehicle?profileId',
      views: {
        'tab-profile': {
          templateUrl: 'app/main/pages/profile/tab-vehicle-detail.html',
          controller: 'VehicleDetailController as vm'
        }
      }
    })
    //    .state('tab.chats', {
    //        url: '/chats',
    //        views: {
    //          'tab-chats': {
    //            templateUrl: 'templates/tab-chats.html',
    //            controller: 'FriendsController as vm'
    //          }
    //        }
    //   })
    /////// Friend States ///////
      .state('tab-friends', {
      url: '/friends',
      abstract: true,
      templateUrl: 'app/main/apps/friends/tab.friends.html'
    }).state('tab-friends.list', {
      url: '/list',
      views: {
        'tab-list': {
          templateUrl: 'app/main/apps/friends/list/list.html',
          controller: 'FriendListController as vm'
        }
      }
    }).state('tab-friends.requests', {
      url: '/requests',
      views: {
        'tab-requests': {
          templateUrl: 'app/main/apps/friends/requests/requests.html'
        }
      }
    }).state('tab-friends.suggestions', {
      url: '/suggestions',
      views: {
        'tab-suggestions': {
          templateUrl: 'app/main/apps/friends/suggestions/suggestions.html'
        }
      }
    }).state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html'
          //     controller: 'AccountCtrl'
        }
      }
    });

    $urlRouterProvider.otherwise('/register');
    // $urlRouterProvider.otherwise('/tab/home');
  };
})();
