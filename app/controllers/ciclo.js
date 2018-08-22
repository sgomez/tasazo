(function(){ 
	var app = angular.module('ciclo', [ ]);

	app.directive('ciclo', function() {
		return {
			restrict: 'E',
			templateUrl: 'assets/views/ciclo.html',
			controller: function($scope) {
				this.selected = 1;

				this.isSet = function(ciclo) {
					return this.selected === ciclo;
				}

				this.setCiclo = function(ciclo) {
				 	this.selected = ciclo;
					$scope.calc.updateChart();
				}
			},
			controllerAs: 'ciclo'
		};
	});
})();
