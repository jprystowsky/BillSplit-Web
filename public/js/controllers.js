'use strict';

angular.module('io.mapping.apps.web.billsplit.controllers', [])
	.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
		$http({method: 'GET', url: '/api/name'}).
			success(function (data, status, headers, config) {
				$scope.name = data.name;
			}).
			error(function (data, status, headers, config) {
				$scope.name = 'Error!'
			});
	}])
	.controller('HomeCtrl', [function () {

	}])
	.controller('NavbarCtrl', ['$scope', 'auth', function ($scope, auth) {
		$scope.$on(auth.messages.USER, function (event, user){
			if (user) {
				$scope.navbarItems = [
					{
						text: 'Bill Sets',
						href: '/bill-sets'
					},
					{
						text: 'Friends',
						href: '/friends'
					}
				];
			} else {
				$scope.navbarItems = [];
			}
		})
	}])
	.controller('GoogleConnectCtrl', ['$scope', '$window', 'auth', 'user', function ($scope, $window, auth, user) {
		listenForUserAuth();

		$window.onGooglePlusSignInCallback = function (data) {
			internalOnSignInCallback(data);
		}

		function internalOnSignInCallback(data) {
			auth.connectGoogle(data.code,
				function (data) {
					console.log("Got OAuth token", data);

					auth.login(function (loginData) {
						console.log("Success logging in", loginData);

						user.getUser(function (user) {
							console.log("Successfully got back user", user);
						}, function () {
							console.log("Error getting back user");
						});
					}, function () {
						console.log("Error logging in.");
					});
				},
				function (data) {
					console.log('Error getting OAuth token', data);
				}
			);
		}

		function listenForUserAuth() {
			$scope.$on(auth.messages.USER, function (event, user) {
				if (user && user.id) {
					$scope.user = user;
				}
			});
		}
	}]);