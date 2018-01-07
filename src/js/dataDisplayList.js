budgetApp.dataDisplayList = (function() {
	let colors = [
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
	]; // TODO: colors in one place
	let dataDisplayList = document.getElementById('data-display-list');
	let currencySign = '$';
	let data = null;

	function getDataPercentages(data) {
		let dataSum = data.reduce(
			(total, datum) => total + parseInt(datum.value),
			0
		);

		return (percentages = data.map((datum) => datum.value / dataSum));
	}

	function clearList() {
		while (dataDisplayList.firstChild) {
			dataDisplayList.removeChild(dataDisplayList.lastChild);
		}
	}

	function draw() {
		let data = budgetApp.storage.getCategoryByIndex(
			budgetApp.currentCategory || 0
		).inputs;
		let dataPercentages = getDataPercentages(data);
		dataDisplayList.style.listStyle = 'none';
		dataDisplayList.style.padding = 0;
		dataDisplayList.style.margin = '0px 12px 0px 12px';

		clearList();

		data.forEach((data, index) => {
			// list & list items
			let listItem = document.createElement('li');
			let itemId = 'data-display-' + index;
			listItem.id = itemId;
			dataDisplayList.append(listItem);

			// percentage
			let percentageDisplay = document.createElement('span');
			percentageDisplay.classList.add('percentage-display');
			percentageDisplay.textContent =
				(dataPercentages[index] * 100).toFixed(0) + '%';
			listItem.append(percentageDisplay);

			// colour circle
			var svg = d3
				.select('#' + itemId)
				.append('svg')
				.attr('width', 30)
				.attr('height', 30)
				.append('g')
				.append('circle')
				.attr('cx', 15)
				.attr('cy', 15)
				.attr('r', 15)
				.style('fill', colors[index]);

			// title
			let titleDisplay = document.createElement('span');
			titleDisplay.classList.add('title-display');
			titleDisplay.textContent = data.name;
			listItem.append(titleDisplay);

			// value
			let valueDisplay = document.createElement('span');
			valueDisplay.classList.add('value-display');
			valueDisplay.textContent = currencySign + data.value;
			listItem.append(valueDisplay);
		});
	}

	return {
		draw,
	};
})();

budgetApp.dataDisplayList.draw();
