'use strict';

/* Directives */


angular.module('io.mapping.apps.web.billsplit.directives', [])
	.directive('googleConnect', function () {
		return {
			replace: true,
			templateUrl: '/directiveTemplates/googleConnect.html'
		};
	});