/**
 * 
 */

var app = angular.module('Promo', ['angular-timeline','uiGmapgoogle-maps','ngRoute']);

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDXnJvicDbYXPwfbatohOiwQdTtvBimT2w',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})




app.controller('AppController', ['$scope','uiGmapGoogleMapApi','$rootScope','$document','$timeout', function AppController($rootScope, $document, $timeout, $scope, uiGmapGoogleMapApi) {
	
	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
	
	uiGmapGoogleMapApi.then(function(maps) {

    });
	
	
	
	
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
				console.log(percentH);
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