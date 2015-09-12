/**
 * 
 */

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('mapcontainer'), {
    center: {lat: 25.235125, lng: 55.297963},
	scrollwheel: false,
    zoom: 16,
	draggable: true
  });
	
  var marker = new google.maps.Marker({
    position: {lat: 25.235125, lng: 55.297963},
    map: map,
    title: 'Zumba Festival 2016, Zabeel Park'
  });
}

function showVenue(){
	map.setCenter({lat: 25.235125, lng: 55.297963});
};

var app = angular.module('Promo', ['angular-timeline','ngRoute','nemLogging','angular-scroll-animate','ui.router']);

/*app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
	
	
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDXnJvicDbYXPwfbatohOiwQdTtvBimT2w',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization',
    });
}]);*/

app.config(function($stateProvider) {
  $stateProvider.state('user', {
    url:         '',
    controller: 'AppController',
    templateUrl: 'example.html'
  });
});






app.controller('AppController', ['$scope','$rootScope','$document','$timeout', function AppController($rootScope, $document, $timeout, $scope) {
	
	
	
	
	
	
	/*var areaLat      = 44.2126995,
      areaLng      = -100.2471641,
      areaZoom     = 3;

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map     = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
    $scope.options = { scrollwheel: false };
  });*/
	
	
	
}]);



app.directive('resize', function ($window) {
    return function (scope, element, attr) {

        var w = $window;
		
        scope.$watch(function () {
            return {
                'h': (document.querySelectorAll("body")[0]).offsetHeight, 
                'w': (document.querySelectorAll("body")[0]).offsetWidth
            };
        }, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.resizeHeight = function (percentH,marginTop,marginBottom,mode) {
                scope.$eval(attr.notifier);
				if(marginTop>0){
					scope.mTop=(newValue.w*marginTop/100);
				}
				else{
					scope.mTop=marginTop;
				}
				if(mode==0){
					return { 
						'height': (newValue.w*percentH/100) + 'px',
						'top': scope.mTop + 'px'
					};
				}
				else{
					return { 
						'height': (newValue.w*percentH/100) + 'px',
						'margin-top': scope.mTop + 'px'
					};
				}
				
                
            };
			
			
			

        }, true);
		
		

        angular.element(w).bind('resize', function () {
            scope.$apply();
        });
    }
}); 