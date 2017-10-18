(function() {
    'use strict';

    angular
        .module('app')
        .factory('authFactory', authFactory);

    authFactory.$inject = ['$q', '$firebaseObject'];
    function authFactory($q, $firebaseObject) {
        var auth = firebase.auth();
        var service = {
            auth: auth,
            loginStatus: loginStatus,
            loginUser: loginUser,
            pwdReset: pwdReset,
            setCredentials: setCredentials,
            signOut: signOut
            
        };
        
        return service;

        ////////////////
        function emailVerification(user) {
            var defer = $q.defer();
            
            user.sendEmailVerification()
                .then(function() {
                    console.log('Email sent');
                    
                    return defer.resolve('email_sent');
                })
                .catch(function(error) {
                    console.error(error);

                    return defer.reject('email_failed');
                });
            
            return defer.promise;
        }

        function loginStatus() {
            return firebase.auth().currentUser;
        }

        function loginUser(credentials) {
            var defer = $q.defer();
            var email = credentials.email;
            var password = credentials.password;

            auth.signInWithEmailAndPassword(email, password)
                .then(function() {
                    var user = loginStatus();

                    return defer.resolve(user);  
                })
                .catch(function(error) {
                    console.log('Error(' + error.code + ':' + error.message);
                    
                    return defer.reject(error);
                });

            return defer.promise;
        }

        function pwdReset(email) {
            var defer = $q.defer();

            auth.sendPasswordResetEmail(emailAddress)
                .then(function() {
                    console.log('Password reset email sent successfully!');
                    defer.resolve('Password reset email sent successfully!');
                })
                .catch(function(error) {
                    console.error("Error: ", error);
                    defer.reject(error);
                });

            return defer.promise;
        }

        function setCredentials(credentials) {    
            var defer = $q.defer();
            var email = credentials.email;
            var password = credentials.password;

            auth.createUserWithEmailAndPassword(email, password)
                .then(function() {
                    var user = loginStatus();
                    
                    return user;
                })
                .catch(function(error) {
                    console.log('Error(' + error.code + ':' + error.message);
                    
                    return defer.reject(error);
                });

            return defer.promise;
        }

        function setProfileName(profileName) {
            var defer = $q.defer();
            
            user.updateProfile({
                displayName: profileName,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
                .then(function() {
                  return defer.resolve('profile_set');
                })
                .catch(function(error) {
                    console.log(error);

                    return defer.reject('profile_failed');
                });

              return defer.promise;
        }

        function signOut() {
            var defer = $q.defer();

            auth.signOut().then(function() {
                console.log('Sign-out successful.')
              }).catch(function(error) {
                console.log('An error happened.')
              });

            return defer.promise; 
        }
    }
})();