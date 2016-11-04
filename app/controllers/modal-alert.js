'use strict';

app.controller('ModalAlertController', ['$rootScope', '$scope', '$log', '$filter', 'close', 'utilService', 'evento', function ($rootScope, $scope, $log, $filter, close, utilService, evento) {
        
        $scope.evento = evento;
      
        $scope.getWindowsPath = function(img){
            $log.log(utilService.getNwGui().global);
            return "file://" + utilService.getNwGui().global.__dirname + "\\img\\"+img;                     
        }
        
        $scope.close = function () {
            close("Success!");
        }
        
        // Enviar Evento
	$scope.$emit('setEventOnMap', { evento: angular.copy($scope.evento) });

    }]);