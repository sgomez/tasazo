(function(){ 
	var app = angular.module('creditos', [ ]);

	app.directive('creditos', function() {
		return {
			'restrict': 'E',
			templateUrl: 'assets/views/creditos.html',
			controller: function($scope) {
				this.values = [0, 0, 0, 0];
			},
			controllerAs: 'creditos'
		};
	});
})();
