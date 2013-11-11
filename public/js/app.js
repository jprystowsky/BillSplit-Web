'use strict';

angular.module('io.mapping.apps.web.billsplit', [
		'ngRoute',
		'ngCookies',
		'LocalStorageModule',
		'io.mapping.apps.web.billsplit.filters',
		'io.mapping.apps.web.billsplit.services',
		'io.mapping.apps.web.billsplit.directives',
		'io.mapping.apps.web.billsplit.controllers'
	])
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/home', {templateUrl: '/partials/home', controller: 'HomeCtrl'})
			.when('/bill-sets', {templateUrl: '/partials/bill-sets'})
			.otherwise({redirectTo: '/home'});

		$locationProvider.html5Mode(true);
	}])
	.run(['$rootScope', function ($rootScope) {
	}]);