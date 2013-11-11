'use strict';

/* Directives */


angular.module('io.mapping.apps.web.billsplit.directives', [])
	.directive('navbar', function () {
		return {
			replace: true,
			templateUrl: '/directiveTemplates/navbar.html'
		};
	})
	.directive('googleConnect', function () {
		return {
			replace: true,
			templateUrl: '/directiveTemplates/googleConnect.html'
		};
	})
	.directive('billSets', function () {
		return {
			replace: true,
			templateUrl: '/directiveTemplates/billSets.html'
		};
	});