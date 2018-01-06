// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

('use strict');

budgetApp.pieChart = {
	draw : function(data) {
		const padding = 24;
		const width = 295 - padding;
		const height = 295 - padding;
		const radius = Math.min(width, height) / 2;
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
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr(
				'transform',
				'translate(' + width / 2 + ',' + height / 2 + ')'
			);

		// inner & outer radii of the pie
		var arc = d3.arc().innerRadius(0).outerRadius(radius);

		var pie = d3
			.pie()
			.value(function(data) {
				return data;
			})
			.sort(null);

		var path = svg
			.selectAll('path')
			.data(pie(data))
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', (data, index) => colours[index]);
	},
};
