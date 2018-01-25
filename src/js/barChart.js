// If budgetApp is undefined, assign new obj
// else use existing budgetApp obj
var budgetApp = budgetApp || {};

('use strict');

budgetApp.barChart = {
	container : document.querySelector(`#chart-container`),

	draw      : function(data) {
		const padding = 24;
		const margin = 24;
		const chartContainer = d3.select('.chart-container');
		const chartWidth = budgetApp.barChart.container.clientWidth - margin;
		const chartHeight = 295;
		let barWidth = 24;
		let dataLength = data.length;
		let colors = budgetApp.storage.getcolors();

		// returns a multiplier used to scale bars based on data values
		function calculateBarHeightMultiplier(data) {
			let maxData = d3.max(data); // returns obj with highest val
			let multiplier = (chartHeight - padding) / maxData;

			if (isNaN(multiplier) || multiplier === Infinity) {
				return 0;
			} else {
				return multiplier;
			}
		}

		let barHeightMultiplier = calculateBarHeightMultiplier(data);

		// append svg to chart container
		const svg = d3
			.select('#chart-container')
			.append('svg')
			.attr('width', chartWidth)
			.attr('height', chartHeight)
			.style('background', 'rgba(0, 0, 0, 0.4)')
			.style('border-radius', '3px')
			.style('margin', '12px');

		// append/setup tooltip div
		let tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
		.style("left", 100 + 'px')
		.style("top", 100 + 'px');

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
					(chartWidth / dataLength / 2 - barWidth - padding / 2) + (padding / 2)
			)
			.attr(
				'y',
				(data) => chartHeight - data * barHeightMultiplier - padding
			)
			.attr('width', barWidth)
			.attr('height', (data) => data * barHeightMultiplier)
			.style('fill', (data, index) => colors[index])
			.style('stroke-width', 1)
			.style('stroke', 'rgba(0, 76, 0, 0.5)')
			// tooltip on hover
			.on("mouseover", function(d) {
				let x = d3.event.pageX;
				let y = d3.event.pageY - 20;

        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
				tooltip.html(d)
            .style("left", x + 'px')
            .style("top", y + 'px');
			})
      .on("mouseout", function(d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
      });

		// remove extra bars
		svg.selectAll('g').data(data).exit().remove();
	},
};
