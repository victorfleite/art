'use strict';

app.service('eventService',['$http','$log','utilService',function($http, $log, utilService) {
	this.getEventList = function() {
                return JSON.parse(utilService.readFileSync('./mapa/json/events.json', 'utf8'));                
	};			

} ]);