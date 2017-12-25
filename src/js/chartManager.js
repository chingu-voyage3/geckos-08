// was giving me errors for some reason
//var budgetApp = budgetApp || {};

// TODO: use data from an actual source
const testData = [512, 23, 155, 39, 200, 250, 99, 58];

// chart displays
import barChart from './barChart.js';
import pieChart from './pieChart.js';

budgetApp.chartManager = (function() {
  let activeChart = barChart; // start with bar chart
  let data = testData; // TODO: get data from proper source

  function init() {
    drawChart(data);
  }

  // removes svg from DOM
  function clearSvg() {
    d3.select('svg').remove();
  }

  function setData(newData) {
    data = newData;
    drawChart(data);
  }

  // auto clears chart
  // TODO: fix use of test data
  function setChart(name, data) {
    switch (name) {
      case 'bar':
        activeChart = barChart;
        break;
      case 'pie':
        activeChart = pieChart;
        break;
      default :
        activeChart = barChart;
        break;
    }
  }

  function drawChart(data) {
    clearSvg();
    activeChart.draw(data);
  }

  // chart selection
  let barChartBtn = document.getElementById('bar-chart-btn');
  barChartBtn.addEventListener('click', (event) => {
    if (activeChart === barChart) {
      return;
    }
    setChart('bar', data);
    drawChart(data);
  })

  let pieChartBtn = document.getElementById('pie-chart-btn');
  pieChartBtn.addEventListener('click', (event) => {
    if (activeChart === pieChart) {
      return;
    }
    setChart('pie', data);
    drawChart(data);
  })

  // public
  return {
    init,
    clearSvg,
    setData,
    setChart,
    drawChart,
  }
})();

// controlling it's own init for now, will switch to index
budgetApp.chartManager.init();
