// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

('use strict');

budgetApp.barChart = {
	container : document.querySelector(`#chart-container`),

	draw      : function(data) {
		const chartContainer = d3.select('.chart-container');
		const chartWidth = budgetApp.barChart.container.clientWidth;
		const chartHeight = 295;
		const padding = 24;
		let barWidth = 25;
		let dataLength = data.length;
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
		const svg = d3
			.select('#chart-container')
			.append('svg')
			.attr('width', chartWidth)
			.attr('height', chartHeight)
			.style('background', 'rgba(0, 0, 0, 0.4)')
			.style('border-radius', '5px')
			.style('margin', '12px');

		// returns a multiplier used to scale bars to fit chart perfectly regardless
		// of the size of data values
		function calculateBarHeightMultiplier(data) {
			let maxData = d3.max(data); // returns obj with highest val

			return (chartHeight - padding) / maxData;
		}

		let barHeightMultiplier = calculateBarHeightMultiplier(data);

		// update existing bars
		svg
			.selectAll('g')
			.data(data)
			.select('rect')
			.attr('x', (data, index) => {
				return chartWidth / dataLength * index;
			})
			.attr(
				'y',
				(data) =>
					chartHeight - data * calculateBarHeightMultiplier(data)
			)
			.attr(
				'height',
				(data) => data * calculateBarHeightMultiplier(data)
			);

		// add new bars
		let newBars = svg.selectAll('g').data(data).enter().append('g');

		newBars
			.append('rect')
			.attr(
				'x',
				(data, index) =>
					chartWidth / dataLength * index +
					(chartWidth / dataLength / 2 - barWidth - padding / 2)
			)
			.attr(
				'y',
				(data) => chartHeight - data * barHeightMultiplier - padding
			)
			.attr('width', barWidth)
			.attr('height', (data) => data * barHeightMultiplier)
			.style('fill', (data, index) => colours[index])
			.style('stroke-width', 1)
			.style('stroke', 'rgba(0, 76, 0, 0.5)');

		// remove extra bars
		svg.selectAll('g').data(data).exit().remove();
	},
};
