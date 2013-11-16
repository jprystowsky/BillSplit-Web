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
	.controller('BillSetAddCtrl', ['$scope', 'billset', function ($scope, billset) {
		$scope.addBillSet = function () {
			billset.create({
				name: $scope.newBillSetName
			}, function () {
				$scope.getBillSets();
			}, function () {
				console.log('Oopsie');
			});
		};
	}])
	.controller('BillSetCtrl', ['$scope', 'billset', function ($scope, billset) {
		$scope.getBillSets = function () {
			billset.query(function (data) {
				$scope.billSets = data;
			}, function () {
				console.log('Drat!');
			});
		};

		$scope.getBillSets();
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
						href: '/billsets'
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
		console.log('load sdk');
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
			console.log('onGooglePlusSignInCallback');
			internalOnSignInCallback(data);
		}

		function internalOnSignInCallback(data) {
			console.log('internalOnSignInCallback', data);

			if (data.error) {
				console.log('error in data response!');
			} else {
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
		}

		function listenForUserAuth() {
			$scope.$on(auth.messages.USER, function (event, user) {
				if (user && user.id) {
					$scope.user = user;
				}
			});
		}

		function renderGoogleButton() {
			console.log('renderGoogleButton');
			// Wait for a raw javascript callback from Google's "done" message
			$window.google_plus_sign_in_render = function () {
				console.log('$window.google_plus_sign_in_render');
				$scope.render();
			};

			// Render function to be triggered
			$scope.render = function () {
				console.log('$scope.render');
				// Render Google button (TODO: add logic to handle already logged in!)
//				gapi.signin.render('gConnect', {
//					scope: "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email",
//					clientid: "671829466340.apps.googleusercontent.com", //TODO: Make flexible
//					redirecturi: "postmessage",
//					accesstype: "offline",
//					cookiepolicy: "single_host_origin",
//					callback: "onGooglePlusSignInCallback",
//					requestvisibleactions: "http://schemas.google.com/AddActivity",
//					theme: "dark"
//
//				});
			}
		}
	}]);