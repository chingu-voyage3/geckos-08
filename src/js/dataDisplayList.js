budgetApp.dataDisplayList = (function() {
	let colors = budgetApp.storage.getcolors();
	let dataDisplayList = document.getElementById('data-display-list');
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

	function updateBudgetTotals() {
		const budgetTotals = document.querySelector(`.budget-totals`);
		const category = budgetApp.currentCategory;

		chrome.storage.sync.get(function(obj) {
			let income = obj.categories[0].inputs.reduce((acc, curr, index) => {
				acc += curr.value;
				return acc;
			}, 0);

			let expenses = obj.categories
				.map((cat, index) => {
					if (cat.name !== `Income`) {
						return cat.inputs.reduce((acc, curr, index) => {
							acc += curr.value;
							return acc;
						}, 0);
					} else {
						return 0;
					}
				})
				.reduce((acc, curr, index) => {
					acc += curr;
					return acc;
				});

			budgetTotals.innerHTML = `<div>
					INCOME :<span> ${budgetApp.currencies[budgetApp.currency]}</span> ${income}
				</div>

				<div>
					EXPENSES :<span> ${budgetApp.currencies[
						budgetApp.currency
					]}</span> ${expenses}
				</div>`;
		});
	}

	function updateCategoryTotal() {
		const categoryTotal = document.querySelector(`.category-total`);
		const category = budgetApp.currentCategory;

		chrome.storage.sync.get(function(obj) {
			let total = obj.categories[
				category
			].inputs.reduce((acc, curr, index) => {
				acc += curr.value;
				return acc;
			}, 0);

			let name = obj.categories[category].name.toUpperCase();

			categoryTotal.innerHTML = `<div>
					${name} :<span> ${budgetApp.currencies[budgetApp.currency]}</span> ${total}
				</div>`;
		});
	}

	function updateTotals() {
		updateBudgetTotals();
		updateCategoryTotal();
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
			percentageDisplay.innerHTML = `${((dataPercentages[index] || 0) *
				100).toFixed(0)}
				<span>
					%
				</span>`;
			listItem.append(percentageDisplay);

			// color circle
			var svg = d3
				.select('#' + itemId)
				.append('svg')
				.attr('width', 32)
				.attr('height', 32)
				.append('g')
				.append('circle')
				.attr('cx', 16)
				.attr('cy', 16)
				.attr('r', 16)
				.style('fill', colors[index]);

			// title
			let titleDisplay = document.createElement('span');
			titleDisplay.classList.add('title-display');
			titleDisplay.textContent = data.name;
			listItem.append(titleDisplay);

			// value
			let valueDisplay = document.createElement('span');

			valueDisplay.classList.add('value-display');
			valueDisplay.innerHTML = `<span>
					${budgetApp.currencies[budgetApp.currency]}
				</span>
				${data.value}`;
			listItem.append(valueDisplay);

			// chrome.storage.sync.get(function(obj) {
			// 	console.log(obj.categories[budgetApp.currentCategory].total);
			// });

			updateTotals();
		});
	}

	return {
		updateTotals,
		draw,
	};
})();
