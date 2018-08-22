(function(){ 
	var app = angular.module('titulacion', [ ]);

	app.directive('nivel', ['$http', function($http) {
		return {
			restrict: 'E',
			templateUrl: 'assets/views/titulacion.html',
			controller: function() {
				titulo = this;
				titulo.titulaciones = [];
				titulo.selected = null;

				$http.get('app/model/titulaciones.json').success(function(data) {
					titulo.titulaciones = data['Andalucía'];
				});

			},
			controllerAs: 'titulacion'
		};
	}]);
})();
