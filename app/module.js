angular.module('pdxValidation', [])
    .directive('currency', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {

                    if (viewValue === '') {
                        ctrl.$setValidity('currency', true);
                        return viewValue;
                    }

                    var regExp = /^[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$/g;

                    if (regExp.test(viewValue)) {
                        ctrl.$setValidity('currency', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('currency', false);
                        return undefined;
                    }

                });
            }
        };
    })
    .directive('integer', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {


                    if (viewValue === '') {
                        ctrl.$setValidity('integer', true);
                        return viewValue;
                    }

                    var regExp = /^\d+$/g;

                    if (regExp.test(viewValue)) {
                        ctrl.$setValidity('integer', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('integer', false);
                        return undefined;
                    }
                });
            }
        };
    })

    .directive('time', [
        function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {

                    ctrl.$parsers.unshift(function (viewValue) {

                        if (viewValue === '') {
                            ctrl.$setValidity('time', true);
                            return viewValue;
                        }

                        var regExp = /^(\d{2}):(\d{2})$/g;


                        if (regExp.test(viewValue)) {
                            var a = viewValue.split(':');

                            var hours = parseInt(a[0]);
                            var minutes = parseInt(a[1]);

                            if (hours < 24 && minutes < 60) {

                                ctrl.$setValidity('time', true);
                                return viewValue;
                            }
                            else {
                                ctrl.$setValidity('time', false);
                                return undefined;
                            }


                        } else {
                            ctrl.$setValidity('time', false);
                            return undefined;

                        }

                    });
                }
            };
        }])
    .controller('pdx', ['$scope', function ($scope) {
        $scope.f = {};
        $scope.help = {
            required: 'field is required',
            currency: 'field must be a currency (12.34)',
            integer: 'field must be an integer',
            time: 'field must be a time (12:34)'
        };
        $scope.helpTypes = [];
        angular.forEach($scope.help, function (v, k) {
            $scope.helpTypes.push(k);
        });

        $scope.showF = function (f) {
            console.log('data', f);
        }
    }]);