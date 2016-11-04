'use strict';

/**
 * @ngdoc overview
 * @name alertAsApp
 * @description
 * # alertAsApp
 *
 * Main module of the application.
 */
var app = angular.module('alertAsApp', [  
    'ngRoute',                                   
	'openlayers-directive',
	'pascalprecht.translate', 
	'angularModalService'
])
        /* define 'config2' constant - which is available in Ng's config phase */
		.constant('LOADER', { 
            LOADED_CLASS: 'pace-done',
            LOADING_CLASS: 'pace-progress' 
         })
        .constant('CONSTANTES', { 
            VIEW_FOLDER: 'app',
            URL_SERVIDOR: 'http://{{HOST}}/sismologic-map/app/web' 
            //URL_SERVIDOR: 'http://alertas/alert2-as/web/'  
         })
        .config(['$logProvider', 'CONSTANTES', '$translateProvider', '$routeProvider', function($logProvider, CONSTANTES, $translateProvider, $routeProvider) {
        	  
        	
         }]).// Inicializa Variaveis de Sistema
         run(['$location', '$log','$rootScope', 'CONSTANTES', function($location, $log, $rootScope,  CONSTANTES) { // instance-injector
        
        	
    }]);
