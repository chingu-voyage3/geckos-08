// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

('use strict');

budgetApp.chartManager = {
	barChartBtn : document.getElementById('bar-chart-btn'),
	pieChartBtn : document.getElementById('pie-chart-btn'),

	activeChart : `barChart`,

	// removes svg from DOM
	clearSvg() {
		d3.select('svg').remove();
	},

	// auto clears svg
	draw() {
		// data is array of values
		let data = budgetApp.dataManager
			.getCategory(budgetApp.currentCategory || 0)
			.subcategories.map((category) => {
				return category.value;
			});

		budgetApp.chartManager.clearSvg();
		if (budgetApp.chartManager.activeChart === `barChart`) {
			budgetApp.barChart.draw(data);
		}
		if (budgetApp.chartManager.activeChart === `pieChart`) {
			budgetApp.pieChart.draw(data);
		}
	},

	setChart(name) {
		switch (name) {
			case 'bar':
				budgetApp.chartManager.activeChart = `barChart`;
				break;
			case 'pie':
				budgetApp.chartManager.activeChart = `pieChart`;
				break;
			default:
				budgetApp.chartManager.activeChart = `barChart`;
				break;
		}
	},
};
