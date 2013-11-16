'use strict';

angular.module('io.mapping.apps.web.billsplit', [
		'ngRoute',
		'ngCookies',
		'ngResource',
		'LocalStorageModule',
		'io.mapping.apps.web.billsplit.filters',
		'io.mapping.apps.web.billsplit.services',
		'io.mapping.apps.web.billsplit.directives',
		'io.mapping.apps.web.billsplit.controllers'
	])
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/home', {templateUrl: '/partials/home', controller: 'HomeCtrl'})
			.when('/login', {templateUrl: '/partials/login', controller: 'LoginCtrl'})
			.when('/billsets', {templateUrl: '/partials/billsets'})
			.otherwise({redirectTo: '/home'});

		$locationProvider.html5Mode(true);
	}])
	.run(['$rootScope', function ($rootScope) {
	}]);