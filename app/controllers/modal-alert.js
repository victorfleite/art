'use strict';

app.controller('ModalAlertController', ['$rootScope', '$scope', '$log', '$filter', 'close', 'utilService', 'local', function ($rootScope, $scope, $log, $filter, close, utilService, local) {
        
        $scope.local = local;
              
        
        $scope.close = function () {
            close("Success!");
        }
        

    }]);