// was giving me errors for some reason
//var budgetApp = budgetApp || {};

// chart displays
import barChart from './barChart.js';
import pieChart from './pieChart.js';

budgetApp.chartManager = (function() {
  let activeChart = barChart; // start with bar chart

  function init() {
    draw();
  }

  // removes svg from DOM
  function clearSvg() {
    d3.select('svg').remove();
  }

  function setChart(name) {
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

  // auto clears svg
  function draw() {
    let data = budgetApp.dataManager.getCategory(budgetApp.currentCategory || 0).subcategories;
    clearSvg();
    activeChart.draw(data);
  }

  // chart selection
  let barChartBtn = document.getElementById('bar-chart-btn');
  barChartBtn.addEventListener('click', (event) => {
    if (activeChart === barChart) {
      return;
    }
    setChart('bar');
    draw();
  })

  let pieChartBtn = document.getElementById('pie-chart-btn');
  pieChartBtn.addEventListener('click', (event) => {
    if (activeChart === pieChart) {
      return;
    }
    setChart('pie');
    draw();
  })

  // public
  return {
    init,
    clearSvg,
    setChart,
    draw,
  }
})();

// controlling it's own init for now, will switch to index
budgetApp.chartManager.init();
