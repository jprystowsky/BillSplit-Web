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
	.controller('LoginCtrl', ['auth', '$location', '$scope', function (auth, $location, $scope) {
		$scope.$on(auth.messages.USER, function (event, user) {
			if (user && user.id) {
				$location.path("/");
			}
		});
	}])
	.controller('HomeCtrl', [function () {

	}])
	.controller('NavbarCtrl', ['$scope', 'auth', function ($scope, auth) {
		var loggedOutItems = [
			{
				text: 'Login',
				href: '/login'
			}
		];

		$scope.navbarItems = loggedOutItems;

		$scope.$on(auth.messages.USER, function (event, user) {
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
				$scope.navbarItems = loggedOutItems;
			}
		})
	}])
	.controller('GoogleConnectCtrl', ['$scope', '$window', 'auth', 'user', function ($scope, $window, auth, user) {
		// Load the SDK Asynchronously
		(function () {
			var po = document.createElement('script');
			po.type = 'text/javascript';
			po.async = true;
			po.src = 'https://plus.google.com/js/client:plusone.js?onload=google_plus_sign_in_render';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(po, s);
		})();

		listenForUserAuth();

		renderGoogleButton();

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

		function renderGoogleButton() {
			// Wait for a raw javascript callback from Google's "done" message
			$window.google_plus_sign_in_render = function () {
				$scope.render();
			};

			// Render function to be triggered
			$scope.render = function () {


				// Render Google button (TODO: add logic to handle already logged in!)
				gapi.signin.render('gConnect', {
					scope: "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email",
					requestvisibleactions: "http://schemas.google.com/AddActivity",
					clientid: "671829466340.apps.googleusercontent.com", //TODO: Make flexible
					accesstype: "offline",
					callback: "onGooglePlusSignInCallback",
					theme: "dark",
					cookiepolicy: "single_host_origin"
				});
			}
		}
	}]);