'use strict';

/* Filters */

var ELHAppFilters = angular.module('ELHAppFilters', []);

ELHAppFilters.filter('interpolate', ['version', function (version) {
    return function (text) {
        return String(text).replace(/\%VERSION\%/mg, version);
    };
}]);

ELHAppFilters.filter('checkmark', function () {
    return function (input) {
        return input ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove';
    };
});

ELHAppFilters.filter('loadingrequest', function () {
    return function (input) {
        return input ? 'overlay' : '';
    };
});

ELHAppFilters.filter('convertCertDate', ['$filter', function ($filter) {
    return function (input) {
        return $filter('date')(input, 'MMM d, yyyy');
    };
}]);

ELHAppFilters.filter('convertEventDate', ['$filter', function ($filter) {
    return function (input) {
        return $filter('date')(input, 'HH:mm, MMM d, yy')
    }
}]);

ELHAppFilters.filter('isExpired', function () {
    return function (input) {
        return (new Date().toISOString() > input);
    };
});

ELHAppFilters.filter('classBasedOnExpiry', ['$filter', function ($filter) {
    return function (input) {
        if ($filter('isExpired')(input)) {
            return "expired-certificate";
        } else {
            return "valid-certificate";
        }
    };
}]);

ELHAppFilters.filter('watch', function () {
    return function (input) {
        return input ? 'glyphicon glyphicon-star ' : 'glyphicon glyphicon-star-empty ';
    };
});

ELHAppFilters.filter('watchBtnText', function () {
    return function (input) {
        return input ? 'Unwatch' : 'Watch';
    };
});


ELHAppFilters.filter('determineLineBreak', function () {
    return function (input) {

        if (input != undefined) {

            if (input.length > 11) {
                return 'break-line'
            } else {
                return '';
            }
        }
        return '';
    };
});

/*ELHAppFilters.filter('lookupOrgNameFromOrgNumber', function(){
 return function(input, $scope){
 console.log("List"+ $scope.orgNrList);
 console.log("input" + input);
 for(var orgnr in $scope.orgNrList){
 console.log($scope.orgNrList.organizationNumber);
 if(input == $scope.orgNrList.organizationNumber)
 return $scope.orgNrList.organizationNumber;
 }
 return input;
 };
 });*/