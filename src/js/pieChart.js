'use strict';

const pieChart = {
  draw: function(data) {
        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        let colours = ['#88d8b0', '#ffcc5c', '#ff6f69', '#ffeead', '#96ceb4',
          '#e1f7d5', '#ffbdbd', '#c9c9ff', '#ffffff', '#f1cbff'];

        // append svg to chart container
        var svg = d3.select('#chart-container')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) +
            ',' + (height / 2) + ')');

        // inner & outer radii of the pie
        var arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);

        var pie = d3.pie()
          .value(function(d) { return d })
          .sort(null);

        var path = svg.selectAll('path')
          .data(pie(data))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', (d, i) => colours[i]);

      }
}

export default pieChart;
