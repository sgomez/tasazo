(function(){
	var app = angular.module('calculadora', [ 'highcharts-ng', 'creditos', 'titulacion', 'ciclo' ]);

	app.controller('CalcController', [ '$scope', '$http', function($scope, $http) {

		calc = this;

		calc.total = 0;
		calc.tasas = [];

		calc.updateSubtitle = function() {
			var subtitle = "Precios para estudios de ";
			switch ($scope.ciclo.selected) {
				case 1:
				  subtitle += "Grado - " + $scope.titulacion.selected.nombre;
				  break;
				case 2:
				  subtitle += "Máster Habilitante " + $scope.titulacion.selected.nombre;
				  break;
				case 3:
				  subtitle += "Máster no Habilitante " + $scope.titulacion.selected.nombre;
				  break;
			}
			$scope.chartConfig.subtitle.text = subtitle;
		};

		calc.resetData = function() {
			for (var i=0; i<5; i++) {
				$scope.chartConfig.series[i].data = [];
			}
			$scope.chartConfig.xAxis.categories = [];
		};

		calc.updateData = function() {
			var ciclo = $scope.ciclo.selected;
			var nivel = $scope.titulacion.selected.nivel;

			angular.forEach(calc.tasas[ciclo], function(data, year) {
				$scope.chartConfig.xAxis.categories.push(year + "/" + (parseInt(year) + 1) );
				calc.total = 0;

				for (var i=0; i<4; i++) {
					$scope.chartConfig.series[i+1].data.push(data[nivel][i]);
					var partial = $scope.creditos.values[i] !== undefined ? $scope.creditos.values[i] : 0;
					calc.total += partial * data[nivel][i];
				}

				$scope.chartConfig.series[0].data.push(calc.total);
			})
		};

		calc.updateChart = function() {
			if ($scope.ciclo.selected === 1 && $scope.titulacion.selected === null) {
				calc.total = 0;
				return;
			}
			calc.resetData();
			calc.updateSubtitle();
			calc.updateData();
		};

		$http.get('app/model/tasas.json').success(function(data) {
			calc.tasas = data['Andalucía'];
		});

		$scope.chartConfig = {
			options: {
				chart: {
					type: 'line'
				}
			},
			title: {
				text: 'Evolución del coste por crédito'
			},
			subtitle: {
				text: 'Precios para estudios de Grado'
			},
			yAxis: [{ // Primary yAxis
                title: {
                    text: 'Coste 1 Crédito (€)',
                },
                labels: {
                    format: '{value}€',
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Coste Total (€)',
                },
                labels: {
                    format: '{value}€',
                },
                opposite: true
            }],
            tooltip: {
                shared: true,
            },
			xAxis: {
				title: {
					text: "´Curso"
				},
				categories: []
			},
			series: [{
        		name: "Coste",
        		type: "column",
        		yAxis: 1,
        		data: [],
        		tooltip: {
                	pointFormat: "{series.name}: {point.y:.2f} €"
            	}
        	},{
            	name: "Primera",
            	data: [],
        		tooltip: {
                	valueSuffix: '€',
            	}
            },{
            	name: "Segunda",
            	data: [],
        		tooltip: {
                	valueSuffix: '€',
            	}
            },{
            	name: "Tercera",
            	data: [],
        		tooltip: {
                	valueSuffix: '€',
            	}
            },{
            	name: "Cuarta",
            	data: [],
        		tooltip: {
                	valueSuffix: '€',
            	}
        	}]
		};
	}]);
})();
