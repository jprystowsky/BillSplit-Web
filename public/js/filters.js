'use strict';

/* Filters */

angular.module('io.mapping.apps.web.billsplit.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
