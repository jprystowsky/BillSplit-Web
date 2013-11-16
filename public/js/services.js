'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('io.mapping.apps.web.billsplit.services', [])
	.service('auth', ['$http', '$rootScope', function ($http, $rootScope) {
		var PREFIX = "io.mapping.apps.web.billsplit.services.auth.";
		var EVENT_USER = PREFIX + "user";

		function _login(successCallback, errorCallback) {
			$http({
				method: 'POST',
				url: 'http://localhost:8080/auth/login',
				withCredentials: true
			})
				.success(function (d, s, h, c) {
					_broadcastUser(d);
					successCallback(d, s, h, c);
				})
				.error(errorCallback);
		}

		function _connectGoogle(code, successCallback, errorCallback) {
			$http({
				method: 'POST',
				url: 'http://localhost:8080/connect/google?state=' + Math.random(),
				data: code,
				withCredentials: true
			})
				.success(successCallback)
				.error(errorCallback);
		}

		function _broadcastUser(user) {
			$rootScope.$broadcast(EVENT_USER, user);
		}

		return {
			connectGoogle: function (code, successCallback, errorCallback) {
				_connectGoogle(code, successCallback, errorCallback);
			},
			login: function (successCallback, errorCallback) {
				_login(successCallback, errorCallback);
			},
			messages: {
				USER: EVENT_USER
			}
		};
	}])
	.service('billset', ['$http', function ($http) {
		function _query(s, e) {
			$http({
				method: 'GET',
				url: 'http://localhost:8080/billset',
				withCredentials: true
			})
				.success(s)
				.error(e);
		}

		function _create(d, s, e) {
			$http({
				method: 'POST',
				url: 'http://localhost:8080/billset',
				data: d,
				withCredentials: true
			})
				.success(s)
				.error(e);
		}

		return {
			query: function (s, e) {
				_query(s, e);
			},
			create: function (d, s, e) {
				_create(d, s, e);
			}
		};
	}])
	.service('user', ['$http', function ($http) {
		function _getUser(successCallback, errorCallback) {
			$http({
				method: 'GET',
				url: 'http://localhost:8080/user/me',
				withCredentials: true
			})
				.success(successCallback)
				.error(errorCallback);
		}

		return {
			getUser: function (successCallback, errorCallback) {
				return _getUser(successCallback, errorCallback);
			}
		}
	}]);