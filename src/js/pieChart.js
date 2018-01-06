// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

('use strict');

budgetApp.pieChart = {
	container : document.querySelector(`#chart-container`),

	draw      : function(data) {
		const chartContainer = d3.select('.chart-container');
		const chartWidth = budgetApp.barChart.container.clientWidth;
		const chartHeight = 295;
		const padding = 24;
		const radius = Math.min(chartWidth, chartHeight) / 2 - padding / 2;
		let colours = [
			'#88d8b0',
			'#ffcc5c',
			'#ff6f69',
			'#ffeead',
			'#96ceb4',
			'#e1f7d5',
			'#ffbdbd',
			'#c9c9ff',
			'#ffffff',
			'#f1cbff',
		];

		// append svg to chart container
		var svg = d3
			.select('#chart-container')
			.append('svg')
			.attr('width', chartWidth)
			.attr('height', chartHeight)
			.style('background', 'rgba(0, 0, 0, 0.4)')
			.style('border-radius', '5px')
			.style('margin', '12px')
			.append('g')
			.attr(
				'transform',
				'translate(' +
					(chartWidth - padding * 2) / 2 +
					',' +
					(chartHeight - padding) / 2 +
					')'
			);

		// inner & outer radii of the pie
		var arc = d3.arc().innerRadius(0).outerRadius(radius);

		var pie = d3
			.pie()
			.value(function(d) {
				return d;
			})
			.sort(null);

		var path = svg
			.selectAll('path')
			.data(pie(data))
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', (d, i) => colours[i]);
	},
};
