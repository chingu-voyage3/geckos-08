// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

('use strict');

budgetApp.chartManager = {
	barChartBtn : document.getElementById('bar-chart-btn'),
	pieChartBtn : document.getElementById('pie-chart-btn'),

	// activeChart : `barChart`,
	activeChart : `bar`,

	// removes svg from DOM
	clearSvg() {
		const chartSvg = document.querySelector(`#chart-container>svg`);

		if (chartSvg) {
			d3.select('svg').remove();
		}
	},

	draw(e) {
		const charts = [`bar`, `pie`];

		// data is array of values
		// let data = budgetApp.dataManager
		// 	.getCategory(budgetApp.currentCategory || 0)
		// 	.subcategories.map((category) => {
		// 		return category.value;
		// 	});

		let data = budgetApp.storage.getCategoryByIndex(
			budgetApp.currentCategory || 0
		).inputs;
		let values = data.map((input) => {
			return input.value;
		});

		budgetApp.chartManager.clearSvg();

		// set activeChart based on button pressed
		charts.forEach((chart) => {
			if (e) {
				if (e.currentTarget.classList.contains(chart)) {
					budgetApp.chartManager.setChart(chart);
					return;
				}
			}
		});

		let current = budgetApp.chartManager.activeChart;

		// draw chart
		budgetApp[`${current}Chart`].draw(values);
	},

	setChart(name) {
		switch (name) {
			case 'bar':
				budgetApp.chartManager.activeChart = `bar`;
				break;
			case 'pie':
				budgetApp.chartManager.activeChart = `pie`;
				break;
			default:
				budgetApp.chartManager.activeChart = `bar`;
				break;
		}
	},
};
